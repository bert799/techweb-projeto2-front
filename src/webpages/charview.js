import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react";
import axios from "axios";
import styles from './style/TelaPersonagem.module.css';
import { Link } from 'react-router-dom';

function Charview ({match, location}) {
    const { params: { charId } } = match;
    const [nome, setNome] = useState();
    const [raca, setRaca] = useState('');
    const [racaDesc, setRacaDesc] = useState();
    const [races, setRaces] = useState([]);
    const [classe, setClasse] = useState('');
    const [classeDesc, setClasseDesc] = useState();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        async function getChar(){
            const charData = await axios
                .get("https://vast-dawn-91290.herokuapp.com/api/char/"+String(charId))
                .then((res) => res.data);
            setNome(charData.name)
            setRaca(charData.race)
            setClasse(charData.playerClass)
        }
        getChar()
    }, []);

    useEffect(() =>{
      console.log(raca)
      axios
      .get(`https://api.open5e.com/races/${raca.toLowerCase()}`)
      .then((res) => {console.log(res.data)
                      setRacaDesc(res.data.desc)});
    },[raca]);

    useEffect(() =>{
      console.log(classe)
      axios
      .get(`https://api.open5e.com/classes/${classe.toLowerCase()}`)
      .then((res) => {console.log(res.data)
                      setClasseDesc(res.data.desc)});
    },[classe]);

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
        axios.patch(`https://vast-dawn-91290.herokuapp.com/api/char/${charId}/`, {name: nome, race: raca, playerClass: classe})
        .then((resposta) => {
          window.location.reload(false);
        });
      }

    return (
        <div>
          <div className={styles.appbar}>
            <h1>DjangosNdragons</h1>
            <div className={styles.links_box}>
              <Link className={styles.links} to={'/'}>Crie um novo personagem</Link>
              <Link className={styles.links} to={'/characters'}>Ver todos os personagens</Link>
            </div>
          </div>
          <h1>Edite Inform????es do seu personagem</h1>
          <div className={styles.sheetContainer}>
            <input className={styles.name} id='nome' type='text' defaultValue={nome} onChange={handleNome}></input>
            
            <h2>Ra??a:</h2>
            <select className={styles.generalSelect} onChange={handleRaca}>
              <option selected disabled hidden>{raca}</option>
              {raceList}
            </select>
            <h2>Descri????o da ra??a:</h2>
            <div className={styles.descriptions}>
              <ReactMarkdown>{racaDesc}</ReactMarkdown>
            </div>
            <h2>Classe:</h2>
            <select className={styles.generalSelect} onChange={handleClasse}>
              <option selected disabled hidden>{classe}</option>
              {classList}
            </select>
            <h2>Descri????o da classe:</h2>
            <div className={styles.descriptions}>
              <ReactMarkdown>{classeDesc}</ReactMarkdown>
            </div>
            <button className={styles.submitButton} onClick={handleSubmit}>Submeter</button>
          </div>
        </div>
    );
};

export default Charview;