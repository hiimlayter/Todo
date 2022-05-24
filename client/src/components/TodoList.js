import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { Redirect } from 'react-router-dom';

function TodoList({user}) {

  const [todos, setTodos] = useState([{}]);

  const fetchTodos = () => {
    fetch('/todos').then(
        res => res.json()
      ).then(
        data => {
          setTodos(data);
        }
      )
    }
    
  useEffect(fetchTodos, []);

  if(user!=='Mateusz'){
    return <Redirect to='/' />;
  }

  const addTodo = todo => {
    if (todo === '' || /^\s*$/.test(todo)) {
        console.log("Naura");
        return;
    }
    fetch("/addTodo/"+todo).then(
        res => res.json()
      ).then(
        data => {
          setTodos(data);
        }
      )
  };

  const updateTodo = (todoId, currentValue, newValue) => {
    if (newValue === '' || /^\s*$/.test(newValue) || currentValue === newValue) {
        console.log("Naura");
        return;
    }
    fetch("/editTodo/"+todoId+"/"+newValue).then(
        res => res.json()
      ).then(
        data => {
          setTodos(data);
        }
      )
  };

  const removeTodo = id => {
    fetch('/deleteTodo/'+id).then(
        res => res.json()
      ).then(
        data => {
          setTodos(data);
        }
      )
  };

  const completeTodo = id => {
    fetch('/completeTodo/'+id).then(
        res => res.json()
      ).then(
        data => {
          setTodos(data);
        }
      )
  };

  return (
    <>
      <h1>Twoja lista zadań {user}</h1>
      <TodoForm onSubmit={addTodo} />
      {todos.map((todo, index) => (
      <Todo todo={todo} index={index} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        ))}
    </>
  );
}

export default TodoList;