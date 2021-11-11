import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react";
import axios from "axios";


function Charview ({match, location}) {
    const { params: { charId } } = match;

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/char/"+String(charId))
        .then((res) => console.log(res.data));
    }, []);

    return (
        <p>{charId}</p>
    );
};

export default Charview;