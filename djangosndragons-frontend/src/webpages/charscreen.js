//file: src/webpages/mybooks.js
import React, { useEffect, useState } from 'react';
import axios from "axios";

const TelaPersonagens = () => {
    const [characters, setCharacters] = useState()

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/char")
        .then((res) => setCharacters(res.data));
    }, []);
    
    console.log(characters)
    
    return (
        <div>
            <h1>Seus Personagens:</h1>
        </div>
    );
};
export default TelaPersonagens;