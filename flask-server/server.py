from datetime import date
from textwrap import indent
from flask import Flask
import json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#Members API Route
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String())
    isComplete = db.Column(db.Boolean, default=False)
    date = db.Column(db.Date, default=db.func.now())
    prio = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    def to_json(self):
        return {
            'id': self.id,
            'text': self.text,
            'isComplete': self.isComplete,
            'date': self.date,
            'prio': self.prio
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    password = db.Column(db.String())
    todos = db.relationship('Todo', backref='user')
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'password': self.password,
            'todos': [todo.to_json() for todo in self.todos]
        }

db.create_all()

@app.route('/todos')
def todos():
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

@app.route('/completeTodo/<int:ident>')
def completeTodo(ident):
    todo = Todo.query.filter_by(id=ident).first()
    todo.isComplete = not todo.isComplete
    db.session.commit()
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

@app.route('/deleteTodo/<int:ident>')
def deleteTodo(ident):
    todo = Todo.query.filter_by(id=ident).first()
    db.session.delete(todo)
    db.session.commit()
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

@app.route('/addTodo/<string:txt>/<string:prio>/<string:data>')
def addTodo(txt, prio, data):
    db.session.add(Todo(text=txt, isComplete=False, user_id=1, prio=prio,date=datetime.strptime(data, '%Y-%m-%d')))
    db.session.commit()
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

@app.route('/editTodo/<int:ident>/<string:text>/<string:prio>/<string:data>')
def editTodo(ident, text, prio, data):
    todo = Todo.query.filter_by(id=ident).first()
    todo.text = text
    todo.prio = prio
    todo.date = datetime.strptime(data, '%Y-%m-%d')
    db.session.commit()
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

if __name__ == '__main__':
    app.run(debug=True)