import { useEffect, useState } from "react";
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.open5e.com/races")
      .then((res) => setNotes(res.data.results));
  }, []);

  console.log(notes);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {notes.name}
          {notes.size}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
