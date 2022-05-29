from flask import Flask, request, jsonify
import json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from sqlalchemy import values

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

#Models
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

@app.route('/login', methods=['POST'])
def login():
    values = request.get_json()
    name = values['username']
    password = values['password']
    user = User.query.filter_by(name=name, password=password).first()
    if user:
        return jsonify({'user': user.name, 'id': user.id, 'success': True})
    else:
        return jsonify({'success': False,'error': 'Błędne dane'})

@app.route('/register', methods=['POST'])
def register():
    values = request.get_json()
    name = values['username']
    password = values['password']
    user = User.query.filter_by(name=name).first()
    if user:
        return jsonify({'success': False,'error': 'Użytkownik o takiej nazwie już istnieje'})
    else:
        user = User(name=name, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'success': True})

@app.route('/todos/<int:user_id>')
def todos(user_id):
    li = Todo.query.filter_by(user_id=user_id).all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

@app.route('/completeTodo/<int:ident>/<int:user_id>')
def completeTodo(ident, user_id):
    todo = Todo.query.filter_by(id=ident).first()
    todo.isComplete = not todo.isComplete
    db.session.commit()
    li = Todo.query.filter_by(user_id=user_id).all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

@app.route('/deleteTodo/<int:ident>/<int:user_id>')
def deleteTodo(ident, user_id):
    todo = Todo.query.filter_by(id=ident).first()
    db.session.delete(todo)
    db.session.commit()
    li = Todo.query.filter_by(user_id=user_id).all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

@app.route('/addTodo/<string:txt>/<string:prio>/<string:data>/<int:user_id>')
def addTodo(txt, prio, data, user_id):
    db.session.add(Todo(text=txt, isComplete=False, user_id=int(user_id), prio=prio,date=datetime.strptime(data, '%Y-%m-%d')))
    db.session.commit()
    li = Todo.query.filter_by(user_id=user_id).all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

@app.route('/editTodo/<int:ident>/<string:text>/<string:prio>/<string:data>/<int:user_id>')
def editTodo(ident, text, prio, data, user_id):
    todo = Todo.query.filter_by(id=ident).first()
    todo.text = text
    todo.prio = prio
    todo.date = datetime.strptime(data, '%Y-%m-%d')
    db.session.commit()
    li = Todo.query.filter_by(user_id=user_id).all()
    return json.dumps([o.to_json() for o in li],indent=4, sort_keys=True, default=str)

if __name__ == '__main__':
    app.run(debug=True)