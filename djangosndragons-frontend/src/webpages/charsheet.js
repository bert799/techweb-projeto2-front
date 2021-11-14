//file: src/webpages/home.js

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


function Charsheet () {
    const [nome, setNome] = useState();
    const [races, setRaces] = useState([]);
    const [raca, setRaca] = useState();
    const [racaDesc, setRacaDesc] = useState();
    const [classes, setClasses] = useState([]);
    const [classe, setClasse] = useState();
    const [classeDesc, setClasseDesc] = useState();
    
    useEffect(() => {
        axios
        .get("https://api.open5e.com/races")
        .then((res) => setRaces(res.data.results));
    }, []);
    useEffect(() => {
      axios
      .get("https://api.open5e.com/classes")
      .then((res) => setClasses(res.data.results));
    }, []);

    let raceList = races.length > 0
    	&& races.map((item, i) => {
      return (
        <option key={i} value={[item.name, item.desc]}>{item.name}</option>
      )
    }, this);
    
    let classList = classes.length > 0
    	&& classes.map((item, i) => {
      return (
        <option key={i} value={[item.name, item.desc]}>{item.name}</option>
      )
    }, this);

    function handleNome(event) {
          let lista = event.target.value.split(",")
          setNome(lista[0]);
        };

    function handleRaca(event) {
      let lista = event.target.value.split(",")
      setRaca(lista[0]);
      lista.shift();
      setRacaDesc(lista.join());
    };

    function handleClasse(event) {
      let lista = event.target.value.split(",")
      setClasse(lista[0]);
      lista.shift();
      setClasseDesc(lista.join());
    };
    
    function handleSubmit() {
      axios.post('https://vast-dawn-91290.herokuapp.com/api/char/', {name: nome, race: raca, playerClass: classe})
      .then((resposta) => {
        window.location.reload(false);
      });
    }
    return (
        <div>
          <div>
            <h1>Crie seu personagem</h1>
            <Link to={'/characters'}>Ver todos os personagens</Link>
          </div>
          <div>
            <input id='nome' type='text' placeholder='Insira o nome do seu personagem' onChange={handleNome}></input>
            
            <h2>Raça:</h2>
            <select onChange={handleRaca}>
              <option selected disabled hidden>Escolha sua raça</option>
              {raceList}
            </select>
            <h2>Descrição da raça:</h2>
            <ReactMarkdown>{racaDesc}</ReactMarkdown>
            
            <h2>Classe:</h2>
            <select onChange={handleClasse}>
              <option selected disabled hidden>Escolha sua classe</option>
              {classList}
            </select>
            <h2>Descrição da classe:</h2>
            <ReactMarkdown>{classeDesc}</ReactMarkdown>

            <button onClick={handleSubmit}>Submeter</button>
          </div>
        </div>
    );
};

export default Charsheet;