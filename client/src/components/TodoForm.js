import React, {useState, useEffect, useRef} from 'react'

function TodoForm(props) {

    const [input,setInput] = useState(props.edit ? props.edit.value : '');
    const [prio,setPrio] = useState(props.edit ? props.edit.prio : "medium");
    const [date,setDate] = useState(props.edit ? props.edit.date : "2022-01-01");

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = e => {
        setInput(e.target.value);
    }
    const handlePrio = e => {
        setPrio(e.target.value);
    }
    const handleDate = e => {
        setDate(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit(input,prio,date);

        setInput('');
    };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
        {props.edit ? (
        <div className='flex-hor'>
        <input type="text" placeholder='...' value={input} name="text" className='todo-input edit' onChange={handleChange} ref={inputRef}/>
        <input type="date"className='date-pic-edit' defaultValue={date} onChange={handleDate}/>
        <div className='selectdiv-edit'>
            <label>
                <select name='prio' value={prio} className='todo-prio' onChange={handlePrio}>
                    <option value="low">Opcjonalne</option>
                    <option value="medium">Normalne</option>
                    <option value="high">Ważne</option>
                </select>
            </label>
        </div>
        <button className='todo-button edit'>Zapisz</button>
        </div>
        ) : (
        <div className='flex-hor'>
        <input type="text" placeholder='np. Posprzątaj garaż' value={input} name="text" className='todo-input' onChange={handleChange} ref={inputRef}/>
        <input type="date" className='date-pic' defaultValue={"2022-01-01"} onChange={handleDate}/>
        <div className='selectdiv'>
            <label>
                <select name='prio' value={prio} className='todo-prio' onChange={handlePrio}>
                    <option value="low">Opcjonalne</option>
                    <option defaultValue value="medium">Normalne</option>
                    <option value="high">Ważne</option>
                </select>
            </label>
        </div>
        <button className='todo-button'>Dodaj zadanie</button>
        </div>
        )}
        
    </form>
  )
}

export default TodoForm