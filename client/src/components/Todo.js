import React,{useState} from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'

function Todo({todo, index, completeTodo, removeTodo, updateTodo}) {

    const [edit,setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, edit.value, value);
        setEdit({
          id: null,
          value: ''
        });
      };
    
      if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
      }

    return (
        <div
          className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
          <div key={todo.id} onClick={() => completeTodo(todo.id)}>
            {todo.text}
          </div>
          <div className='icons'>
            <TiEdit onClick={()=>setEdit({id: todo.id, value: todo.text})} className='edit-icon'/>
            <RiCloseCircleLine onClick={()=>removeTodo(todo.id)} className='delete-icon'/>
          </div>
        </div>
      );
}

export default Todo