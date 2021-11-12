import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react";
import axios from "axios";


function Charview ({match, location}) {
    const { params: { charId } } = match;
    const [nome, setNome] = useState();
    const [raca, setRaca] = useState();
    const [racaDesc, setRacaDesc] = useState();
    const [races, setRaces] = useState([]);
    const [classe, setClasse] = useState();
    const [classeDesc, setClasseDesc] = useState();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
         async function getRaca(){
            console.log(raca)
            await axios
            .get(`https://api.open5e.com/races/${raca}`)
            .then((res) => {console.log(res.data)});
        }
        async function getChar(){
            const charData = await axios
                .get("http://localhost:8000/api/char/"+String(charId))
                .then((res) => res.data);
            console.log(charData.race)
            setRaca(charData.race)
            console.log(raca, 'RACA')
            getRaca()
        }
        getChar()
    }, []);

    // useEffect(() => {
    //     axios
    //     .get("http://localhost:8000/api/char/"+String(charId))
    //     .then((res) => {console.log(res.data)
    //                     setNome(res.data.name)
    //                     setRaca(res.data.race)
    //                     setClasse(res.data.playerClass)});
    // }, []);

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
        console.log(nome,raca,classe)
        axios.patch(`http://127.0.0.1:8000/api/char/${charId}/`, {name: nome, race: raca, playerClass: classe})
        .then((resposta) => {
          window.location.reload(false);
        });
      }

    return (
        <div>
            <input id='nome' type='text' placeholder={nome} onChange={handleNome}></input>
            
            <h2>Raça:</h2>
            <select onChange={handleRaca}>
              <option selected disabled hidden>{raca}</option>
              {raceList}
            </select>
            <h2>Descrição da raça:</h2>
            <ReactMarkdown>{racaDesc}</ReactMarkdown>
            
            <h2>Classe:</h2>
            <select onChange={handleClasse}>
              <option selected disabled hidden>{classe}</option>
              {classList}
            </select>
            <h2>Descrição da classe:</h2>
            <ReactMarkdown>{classeDesc}</ReactMarkdown>

            <button onClick={handleSubmit}>Submeter</button>
        </div>
    );
};

export default Charview;