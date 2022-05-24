import React, {useState, useEffect, useRef} from 'react'

function TodoForm(props) {

    const [input,setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit(input);

        setInput('');
    };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
        {props.edit ? (
        <>
        <input type="text" placeholder='...' value={input} name="text" className='todo-input edit' onChange={handleChange} ref={inputRef}/>
        <button className='todo-button edit'>Zapisz</button>
        </>
        ) : (
        <>
        <input type="text" placeholder='np. Posprzątaj garaż' value={input} name="text" className='todo-input' onChange={handleChange} ref={inputRef}/>
        <button className='todo-button'>Dodaj zadanie</button>
        </>
        )}
        
    </form>
  )
}

export default TodoForm