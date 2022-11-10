import './index.scss';
import React from 'react';

const Form = ({ input, setInput, setSearchTerm }) => {

  const titleInputHandler = (e) => setInput(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchTerm(input);
    setInput('');
  }

  return (
    <>
    <h1>LISTEN TO ME</h1>
    <form className="form" onSubmit={submitHandler}>
    <div className="rainbow">
    <input value={input} onChange={titleInputHandler} type="text" className="form__input" id="txtTodoItemToAdd" placeholder="Search for artist" />
    </div>
    </form>
    </>
  )
}

export default Form;