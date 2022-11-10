import './App.css';
import React, { useState } from 'react';
import Artists from './components/artists-search';
// import getId from './components/http';
import Form from './components/form';

const App = () => {
const [input, setInput] = useState('')
const [searchTerm, setSearchTerm] = useState('')

return <>
<Form input={input} setInput={setInput} setSearchTerm={setSearchTerm} />
<Artists searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
</>
}

export default App;
