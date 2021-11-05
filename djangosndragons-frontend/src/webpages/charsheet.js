//file: src/webpages/home.js

import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";


function Charsheet () {
    const [races, setRaces] = useState([]);
    const [raca, setRaca] = useState();
    const [desc, setDesc] = useState();
    

    useEffect(() => {
        axios
        .get("https://api.open5e.com/races")
        .then((res) => setRaces(res.data.results));
    }, []);

    useEffect(() => {
      console.log("mudou")
      console.log(raca)
      console.log(desc)
    }, [raca, desc])

    console.log(races)
    let raceList = races.length > 0
    	&& races.map((item, i) => {
      return (
        <option key={i} value={[item.name, item.desc]}>{item.name}</option>
      )
    }, this);

    function handlePrint(event) {
      let lista = event.target.value.split(",")
      setRaca(lista[0]);
      lista.shift();
      setDesc(lista.join());
    };
    
    return (
        <div>
            <input id='nome' type='text' placeholder='Insira o nome do seu personagem'></input>
            <select onChange={handlePrint}>
              <option selected disabled hidden>Escolha sua raça</option>
              {raceList}
            </select>
            <button>Submeter</button>
            <h2>Raça:</h2>
            <p>{raca}</p>
            <h2>Descrição:</h2>
            <p>{desc}</p>
        </div>
    );
};

export default Charsheet;