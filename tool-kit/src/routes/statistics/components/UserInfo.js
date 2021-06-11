import React from 'react';
import { Graph } from './Graph';

const DEBUG = false;

class UserInfo extends React.Component {

  //----------------- Constructiors -----------------------//
  constructor(props) {
    super(props);
    this.state = {
      steamID: '',
      numGames: '',
      games: [],
      playerName: '',
    };
  
    // bind 'this' pointer to functions
    this.handleSteamIDChange = this.handleSteamIDChange.bind(this);
    this.handleNumGamesChange = this.handleNumGamesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //----------------- Event Handling ----------------------//

  handleSteamIDChange(event) {
    if (DEBUG) {
      console.log(event.target.value);
    }
    this.setState({
      steamID: event.target.value,
    });
  }

  handleNumGamesChange(event) {
    if (DEBUG) {
      console.log(event.target.value);
    }
    this.setState({
      numGames: event.target.value,
    });
  }

  handleSubmit(event) {
    let apiUrl = 'https://aoe2.net/api/player/matches?game=aoe2de&steam_id=' + this.state.steamID + "&count=" + this.state.numGames;

    if (DEBUG) {
      console.log(apiUrl)
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(result => {
            let tempResult = _parseData(result, this.state.steamID);
            this.setState({
              games: tempResult.games,
              playerName: tempResult.playerName,
            });
        })
        .catch(error => {
          alert('Error: Check that steam id and number of games are correct.');
          console.error('Error: ', error);
        });

    function _parseData(result, steamID) {
        const playerName = result[0].players.filter(p => p.steam_id === steamID)[0].name;
        if (DEBUG) {
          console.log(playerName);
        }

        let civ = -1;
        let map = -1;
        let won = false;
        let games = [];
        result.forEach( (game) => {
            // Parse data from api 
            map = game.map_type;
            for (let i = 0; i < game.players.length; i++) {
                if (game.players[i].steam_id === steamID) {
                    civ = game.players[i].civ;
                    won = game.players[i].won;
                    break;
                }
            }
            // push data into games
            games.push({
                civ: civ,
                map: map,
                won: won,
            });
        });
        return {games: games, playerName: playerName};
    }
    
    if (DEBUG) {
      console.log(this.state.games);
    }

    event.preventDefault();
  }

  //----------------- Render ------------------------------//

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}> 
            <input type="submit" className="user-info-submission" value="Submit"/>
            <input type="text" className="game-count" value={this.state.numGames} onChange={this.handleNumGamesChange} placeholder="Number of Games"/>
            <input type="text" className="steam-id" value={this.state.steamID} onChange={this.handleSteamIDChange} placeholder="Steam ID"/>
        </form>
          <Graph playerName = {this.state.playerName} games={this.state.games} civsInFilter={this.props.civsInFilter}/>
      </div>
    )
  }
}

export {UserInfo};