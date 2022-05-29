import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList(passedData, setUser, setUserID) {

  const [todos, setTodos] = useState([]);
  const id = passedData.data.id;

  const fetchTodos = () => {
    fetch('/todos/'+id).then(
        res => res.json()
      ).then(
        data => {
          console.log(data);
          setTodos(data);
        }
      )
    }
    
  useEffect(fetchTodos,[]);

  const addTodo = (todo,prio,date) => {
    if (todo === '' || /^\s*$/.test(todo)) {
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
          return;
        }
      }
    }
    console.log(todoId, currentValue, newValue, oldPrio, newPrio, oldDate, newDate);
    fetch("/editTodo/"+todoId+"/"+newValue+"/"+newPrio+"/"+newDate+"/"+passedData.data.id).then(
        res => res.json()
      ).then(
        data => {
          setTodos(data);
        }
      )
  };

  const removeTodo = id => {
    fetch('/deleteTodo/'+id+"/"+passedData.data.id).then(
        res => res.json()
      ).then(
        data => {
          setTodos(data);
        }
      )
  };

  const completeTodo = id => {
    fetch('/completeTodo/'+id+"/"+passedData.data.id).then(
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
      <Todo todo={todo} index={index} key={index} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        ))}
      <div className='logout-div'><form onSubmit={() => {
        sessionStorage.clear();
        setUser('');
        setUserID('');}
        }><button className='logoutBtn'>Wyloguj</button></form></div>
    </>
  );
}

export default TodoList;