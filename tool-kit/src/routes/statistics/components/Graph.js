import React from 'react';
import {Bar} from 'react-chartjs-2';

const DEBUG = false;
const CIVS = ['Aztecs', 'Berbers', 'Britons', 'Bulgarians', 'Burgundians', 'Burmese', 'Byzayntines', 'Celts',
            'Chinese', 'Cumans', 'Ethiopians', 'Franks', 'Goths', 'Huns', 'Incas',
            'Indians', 'Italians', 'Japanese', 'Khmer', 'Koreans', 'Lithuanians', 'Magyars',
            'Malay', 'Malians', 'Mayans', 'Mongols', 'Persians', 'Portuguese', 'Saracens', 'Sicilians',
            'Slavs', 'Spanish', 'Tatars', 'Teutons', 'Turks', 'Vietnamese', 'Vikings'];

function MakeChart(props) {
  const data = {
    labels: props.yData,
    datasets: [{
      label: props.playerName + "'s Match Data",
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: props.xData,
    }],
  };

  return (
    <>
        {/* <h2>Bar Example (custom size)</h2> */}
      <div className="stats-chart">
        <Bar
          data={data}
          width={500}
          height={350}
          // options={{
          //   maintainAspectRatio: false
          // }}
        />
      </div>
    </>
  );
}

class Graph extends React.Component {
  constructor() {
    super();
    this.state = {
      yData: [],
      xData: [],
      makeChart: false,
    }
    this.handleGraphButton = this.handleGraphButton.bind(this);
  }

  parseGameDataToGraph = () => {
    if (DEBUG) {
      console.log("Games: ", this.props.games);
      console.log("Civs to Filter: ", this.props.civsInFilter);
    }

    // Apply Filter Criteria to games
    const gamesToGraph = this.props.games.filter(g => this.props.civsInFilter.includes(g.civ));

    // Good moment for Typescript graphData takes form of 
    /* 
      {
        civName: string,
        gamesWon: number,
        totalGames: number,
      }
    */
    let graphData = [];
    gamesToGraph.forEach(g => {
      let civName = CIVS[g.civ];

      if (!graphData.some(e => e.civName === civName)) {
        if (g.won) {
          graphData.push({
            civName: civName,
            gamesWon: 1,
            totalGames: 1, 
          });
        } else {
          graphData.push({
            civName: civName,
            gamesWon: 0,
            totalGames: 1, 
          });
        }
      } else {
        let index = graphData.findIndex(e => e.civName === civName);
        if (g.won) {
          graphData[index].gamesWon += 1;
          graphData[index].totalGames += 1;
        } else {
          graphData[index].totalGames += 1;
        }
      }
    });

    if (DEBUG) {
      console.log("Games to Graph: ", gamesToGraph);
      console.log(graphData);
      let totalGames = 0;
      graphData.forEach(g => {
        totalGames += g.totalGames;
      });
      console.log(totalGames);
    }

    this.setState({
      yData: graphData.map(g => g.civName),
      xData: graphData.map(g => g.gamesWon/g.totalGames),
    });

  }

  //----------------- Event Handling ----------------------//
  handleGraphButton(event) {
    this.parseGameDataToGraph();
    console.log("HI");
    this.setState({
      makeChart: true,
    });
    event.preventDefault();
  }

  //----------------- Render ------------------------------//
  renderGraphButton() {
    return (
      <>
      <div>
        <button className="graph-button" onClick={(event) => this.handleGraphButton(event)}>
          GRAPH ME!
        </button>
      </div>
      <div> 
        {this.state.makeChart ? <MakeChart playerName={this.props.playerName} xData={this.state.xData} yData={this.state.yData}/> : null}
      </div>
      </>
    );
  }

  render() {
    return(
      <>
        {this.renderGraphButton()}
      </>
    );
  }
}

export {Graph};