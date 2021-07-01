import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./App.css";

import {CivBoard} from "./routes/civ-draft/CivBoard.js"
import { Statistics } from './routes/statistics/Statistics.js';

export default function App() {
  return (
    <Router> 
     <div> 
        <header className="header">
         <nav className="nav-bar"> 
           {/* <ul className="links">  */}
               <Link className="link-to-home" to="/"> Home </Link> 
               <Link className="link-to-draft-board" to="/DraftBoard"> Draft_Board </Link> 
               <Link className="link-to-stats-page" to="/StatPage"> Statistics </Link> 
           {/* </ul>  */}
         </nav> 
        </header>

         <Switch> 
           <Route path="/DraftBoard"> 
            <DraftBoard/>
           </Route> 
           <Route path="/StatPage"> 
            <StatsPage/>
           </Route> 
           <Route path="/"> 
             <Home /> 
           </Route> 
         </Switch>
       </div> 
     </Router> 
  )
}

function Home() {
  return (
    <div className="home">
      <h2> Home </h2>
      <p> Welcome to Jerbo's AOE2 Toolkit. Here you can find a draft board and statistics page to assist your play</p>
    </div>
  );
}

function DraftBoard() {
  return (
    <div>
      <CivBoard />
    </div>
  );
}

function StatsPage() {
  return (
    <div className="stats-page">
      <Statistics />
    </div>
  );
} 