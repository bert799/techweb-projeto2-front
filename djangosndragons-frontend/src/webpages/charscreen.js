//file: src/webpages/mybooks.js
import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from './style/TelaPersonagem.module.css';
import {image} from 'react-image'
import { Link } from 'react-router-dom';

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
      if (item.name !== '' && item.race !== '' && item.playerClass !== ''){
        let img_path = require('./imgs/'+String(item.playerClass)+'.png').default //+'/imgs/'+String(item.playerClass)+'.png'
        return (
          <div className={styles.charsheet}>
            <p className={styles.text1}>{"Nome: "+item.name}</p>
            <p className={styles.text1}>{"Raça: "+item.race}</p>
            <p className={styles.text1}>{"Classe: "+item.playerClass}</p>
            <img width="100" src={img_path}/>
            <Link to={'/character/'+item.id}> Editar personagem</Link>
            <button onClick={(event)=>handleDelete(event, item.id)}>Deletar Personagem {item.id}</button>
          </div>
        )}
      }, this);
    
    return (
        <div>
            <h1>Seus Personagens:</h1>
            <Link to={'/'}>Crie um novo personagem</Link>
            <div className={styles.generalContainer}>
              {charList}
            </div>
        </div>
    );
};
export default TelaPersonagens;