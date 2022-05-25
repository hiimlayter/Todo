import React,{useState} from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'

function Todo({todo, index, completeTodo, removeTodo, updateTodo}) {

    const [edit,setEdit] = useState({
        id: null,
        value: '',
        prio: '',
        date: ''
    })

    const submitUpdate = (value, prio, date) => {
        updateTodo(edit.id, edit.value, value, edit.prio, prio, edit.date, date);
        setEdit({
          id: null,
          value: '',
          prio: '',
          date: ''
        });
      };
    
      if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
      }

    const prioToString = (prio) => {
        switch(prio){
            case "low":
                return 'Opcjonalne';
            case "medium":
                return 'Normalne';
            case "high":
                return 'Ważne';
            default:
                return 'Brak';
        }
    }

    return (
        <div
          className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
          <div key={todo.id} onClick={() => completeTodo(todo.id)}>
            {todo.text}
          </div>
          <div className='todo-info'>
            <div className='todo-space'>
              Termin: {todo.date} | Priorytet: {prioToString(todo.prio)}
            </div>
            <div className='icons'>
              <TiEdit onClick={()=>setEdit({id: todo.id, value: todo.text, prio: todo.prio, date: todo.date})} className='edit-icon'/>
              <RiCloseCircleLine onClick={()=>removeTodo(todo.id)} className='delete-icon'/>
            </div>
          </div>
        </div>
      );
}

export default Todo