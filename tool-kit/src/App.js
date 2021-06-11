import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {CivBoard} from "./routes/civ-draft/CivBoard.js"
import { Statistics } from './routes/statistics/Statistics.js';

export default function App() {
  return (
    <Router> 
     <div> 
         <nav> 
           <ul> 
             <li> 
               <Link to="/"> Home </Link> 
             </li> 
             <li> 
               <Link to="/about"> About </Link> 
             </li> 
             <li> 
               <Link to="/users"> Users </Link> 
             </li> 
           </ul> 
         </nav> 
         <Switch> 
           <Route path="/about"> 
             <About /> 
           </Route> 
           <Route path="/users"> 
             <Users /> 
           </Route> 
           <Route path="/users"> 
             <Home /> 
           </Route> 
         </Switch>
       </div> 
     </Router> 
  )
}

function Home() {
  return <h2> Home </h2>
}

function About() {
  return <CivBoard />
}

function Users() {
  return <Statistics />
} 