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
        .get("https://vast-dawn-91290.herokuapp.com/api/char/")
        .then((res) => setCharacters(res.data));
    }, []);

    console.log(characters)

    function handleDelete(event, id) {
      axios.delete('https://vast-dawn-91290.herokuapp.com/api/char/'+String(id))
      .then((resposta) => {
        window.location.reload(false);
      });
    }

    function handleEdit(event, id) {
      window.location='/character/'+id;
    }

    function handleCharCreationButton() {
      window.location='/';
    }
    
    let charList = characters.length > 0
    	&& characters.map((item, i) => {
      if (item.name !== '' && item.race !== '' && item.playerClass !== ''){
        let img_path = require('./imgs/'+String(item.playerClass)+'.png').default //+'/imgs/'+String(item.playerClass)+'.png'
        return (
          <div className={styles.charsheet}>
            <p className={styles.text1}>{"Nome: "+item.name}</p>
            <div className={styles.racaclasse}>
              <p className={styles.text1}>{"Raça: "+item.race}</p>
              <p className={styles.text1}>{"Classe: "+item.playerClass}</p>
            </div>
            <img className={styles.portrait} src={img_path}/>
            <div className={styles.editdelbuttons}>
              {/* <Link to={'/character/'+item.id}> Editar personagem</Link> */}
              <button onClick={(event) => handleEdit(event, item.id)}> Editar Personagem </button>
              <button onClick={(event)=>handleDelete(event, item.id)}>Deletar Personagem </button>
            </div>
          </div>
        )}
      }, this);
    
    return (
        <div>
            <h1>Seus Personagens:</h1>
            {/* <Link to={'/'}>Crie um novo personagem</Link> */}
            <button onClick={handleCharCreationButton}>Crie um novo personagem</button>
            <div className={styles.generalContainer}>
              {charList}
            </div>
        </div>
    );
};
export default TelaPersonagens;