//file: src/webpages/home.js

import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";


function Charsheet () {
    const [races, setRaces] = useState([]);

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
    return (
        <div>
            <select>{raceList}</select>
            <h1>Book App</h1>
            <p>This is home page</p>
        </div>
    );
};

export default Charsheet;