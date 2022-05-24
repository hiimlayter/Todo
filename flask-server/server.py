from textwrap import indent
from flask import Flask
import json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#Members API Route
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String())
    isComplete = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    def to_json(self):
        return {
            'id': self.id,
            'text': self.text,
            'isComplete': self.isComplete
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

@app.route('/todos')
def members():
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=3)

@app.route('/completeTodo/<int:ident>')
def completeTodo(ident):
    todo = Todo.query.filter_by(id=ident).first()
    todo.isComplete = not todo.isComplete
    db.session.commit()
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=3)

@app.route('/deleteTodo/<int:ident>')
def deleteTodo(ident):
    todo = Todo.query.filter_by(id=ident).first()
    db.session.delete(todo)
    db.session.commit()
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=3)

@app.route('/addTodo/<string:txt>')
def addTodo(txt):
    db.session.add(Todo(text=txt, isComplete=False, user_id=1))
    db.session.commit()
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=3)

@app.route('/editTodo/<int:ident>/<string:text>')
def editTodo(ident, text):
    todo = Todo.query.filter_by(id=ident).first()
    todo.text = text
    db.session.commit()
    li = Todo.query.all()
    return json.dumps([o.to_json() for o in li],indent=3)

if __name__ == '__main__':
    app.run(debug=True)