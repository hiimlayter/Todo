import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { Redirect } from 'react-router-dom';

function TodoList(passedData, logout) {

  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch('/todos/'+passedData.data.id).then(
        res => res.json()
      ).then(
        data => {
          setTodos(data);
        }
      )
    }
    
  useEffect(fetchTodos, []);

  const addTodo = (todo,prio,date) => {
    if (todo === '' || /^\s*$/.test(todo)) {
        console.log("Naura");
        return;
    }
    fetch("/addTodo/"+todo+"/"+prio+"/"+date+"/"+passedData.data.id).then(
        res => res.json()
      ).then(
        data => {
          setTodos(data);
        }
      )
  };

  const updateTodo = (todoId, currentValue, newValue, oldPrio, newPrio, oldDate, newDate) => {
    if(newPrio === oldPrio){
      if(newDate === oldDate){
        if (newValue === '' || /^\s*$/.test(newValue) || currentValue === newValue) {
          console.log("Naura");
          return;
        }
      }
    }
    console.log(todoId, currentValue, newValue, oldPrio, newPrio, oldDate, newDate);
    fetch("/editTodo/"+todoId+"/"+newValue+"/"+newPrio+"/"+newDate).then(
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
      <h1>Twoja lista zadań {passedData.data.user}</h1>
      <TodoForm onSubmit={addTodo} />
      {todos.map((todo, index) => (
      <Todo todo={todo} index={index} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        ))}
      <div className='logout-div'><form onSubmit={logout}><button className='logoutBtn'>Wyloguj</button></form></div>
    </>
  );
}

export default TodoList;