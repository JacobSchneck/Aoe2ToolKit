import React from 'react';
import "./statistics.css";

import { UserInfo } from './components/UserInfo';
import { Filters } from './components/Filters';

/********************************************** GLOBALS ****************************************************/
// const EXAMPLE_STEAM_ID = 76561198134218675
// const EXAMPLE_API_URL = 'https://aoe2.net/api/player/matches?game=aoe2de&steam_id=76561198134218675&count=1';
const DEBUG = true;
const CIVS = ['Aztecs', 'Berbers', 'Britons', 'Bulgarians', 'Burgundians', 'Burmese', 'Byzayntines', 'Celts',
            'Chinese', 'Cumans', 'Ethiopians', 'Franks', 'Goths', 'Huns', 'Incas',
            'Indians', 'Italians', 'Japanese', 'Khmer', 'Koreans', 'Lithuanians', 'Magyars',
            'Malay', 'Malians', 'Mayans', 'Mongols', 'Persians', 'Portuguese', 'Saracens', 'Sicilians',
            'Slavs', 'Spanish', 'Tatars', 'Teutons', 'Turks', 'Vietnamese', 'Vikings'];


/********************************************** ROOT *****************************************************/
class Statistics extends React.Component {
  //----------------- Constructors ------------------------//
  constructor(props) {
    super(props);
    this.state = {
      civsInFilter: [],
      isCivIn: Array(CIVS.length).fill(false),
      mapFilters: [],
    }
  }

  //----------------- Event Handling ----------------------//
  handleCivButton(event, index) {
    let tempCivs = this.state.civsInFilter.slice();
    let tempCheck = this.state.isCivIn.slice();
    tempCheck[index] = !tempCheck[index];

    if (this.state.isCivIn[index]) {
      tempCivs = tempCivs.filter((value) => {
        return value !== index;
      });
    } else {
      tempCivs.push(index);
    }
    
    this.setState({
      civsInFilter: tempCivs,
      isCivIn: tempCheck,
    });
    if (DEBUG) {
      console.log(this.state.civsInFilter);
    }

    event.preventDefault();
  }
  //----------------- Render ------------------------------//
  render() {
    return (
      <div>
        <div className="user-info"> 
          <UserInfo civsInFilter={this.state.civsInFilter}/>
        </div>
        <div className="filters"> 
          <Filters addCivToFilter={(event, index) => this.handleCivButton(event, index)} isCivIn={this.state.isCivIn}/>
        </div>
      </div>
    )
  }
}

export {Statistics};