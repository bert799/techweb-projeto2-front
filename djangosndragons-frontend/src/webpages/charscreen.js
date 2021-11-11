//file: src/webpages/mybooks.js
import React, { useEffect, useState } from 'react';
import axios from "axios";

const TelaPersonagens = () => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/char")
        .then((res) => setCharacters(res.data));
    }, []);

    console.log(characters)

    function handleDelete(event, id) {
      axios.delete('http://127.0.0.1:8000/api/char/'+String(id))
      .then((resposta) => {
        window.location.reload(false);
      });
    }
    
    let charList = characters.length > 0
    	&& characters.map((item, i) => {
      return (
        <div>
          <li>{"Nome: "+item.name+"; Raça: "+item.race+"; Classe: "+item.playerClass}</li>
          <button onClick={(event)=>handleDelete(event, item.id)}>Deletar Personagem {item.id}</button>
        </div>
      )
    }, this);
    
    return (
        <div>
            <h1>Seus Personagens:</h1>
            {charList}
        </div>
    );
};
export default TelaPersonagens;