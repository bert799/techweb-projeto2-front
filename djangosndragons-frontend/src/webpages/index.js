//file: src/webpages/index.js

import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
  
import Charsheet from './charsheet';
import TelaPersonagens from './charscreen';
import Favorites from './favorites';
import Charview from './charview';

const Webpages = () => {
    return(
        <Router>
            <Route exact path="/" component= {Charsheet} />
            <Route path = "/characters" component = {TelaPersonagens} />
            <Route path = "/favorites" component = {Favorites} />
            <Route path = "/character/:charId" component = {Charview} />
        </Router>
    );
};

export default Webpages;