//file: src/webpages/home.js

import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";


function Charsheet () {
    const [races, setRaces] = useState([]);
    const raca = document.getElementById('raca');
    

    useEffect(() => {
        axios
        .get("https://api.open5e.com/races")
        .then((res) => setRaces(res.data.results));
    }, []);

    console.log(races)
    let raceList = races.length > 0
    	&& races.map((item, i) => {
      return (
        <option key={i} value={item.slug}>{item.name}</option>
      )
    }, this);

    function handlePrint() {
        console.log(raca.value);
        console.log(races[0].desc)
    };
    
    return (
        <div>
            <input id='nome' type='text' placeholder='Insira o nome do seu personagem'></input>
            <select defaultValue = {false} id='raca' name='oi'>
              <option value={false} selected disabled hidden>Escolha sua raça</option>
              {raceList}
            </select>
            {raca != false &&
              <p>baba</p>
            }
            <button onClick={handlePrint}>Submeter</button>
        </div>
    );
};

export default Charsheet;