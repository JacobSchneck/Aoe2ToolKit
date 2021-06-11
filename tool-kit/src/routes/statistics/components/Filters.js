import React from "react";

const DEBUG = false;

const CIVS = ['Aztecs', 'Berbers', 'Britons', 'Bulgarians', 'Burgundians', 'Burmese', 'Byzayntines', 'Celts',
            'Chinese', 'Cumans', 'Ethiopians', 'Franks', 'Goths', 'Huns', 'Incas',
            'Indians', 'Italians', 'Japanese', 'Khmer', 'Koreans', 'Lithuanians', 'Magyars',
            'Malay', 'Malians', 'Mayans', 'Mongols', 'Persians', 'Portuguese', 'Saracens', 'Sicilians',
            'Slavs', 'Spanish', 'Tatars', 'Teutons', 'Turks', 'Vietnamese', 'Vikings'];

class CivFilters extends React.Component {
  //----------------- Render -----------------------//
  RenderCivButtons() {
    return CIVS.map((civ, index) => {
      if (this.props.isCivIn[index]) {
        return (
          <div>
            <button className="civ-button-on" onClick={(event) => this.props.addCivToFilter(event, index)}> {civ} </button>
          </div>
        );
      } else {
          // console.log(this.props.isCivIn[index]);
          return (
            <div>
              <button className="civ-button-off" onClick={(event) => this.props.addCivToFilter(event, index)}> {civ} </button>
            </div>
          );
      }
    });
  }

  render() {
    if (DEBUG) {
      console.log(this.props.civsInFilter);
    }

    return (
      <form className="civ-container">
        CIVALIZATIONS
        <div>
          {this.RenderCivButtons()}
        </div>
      </form>
    );
  }
}

class Filters extends React.Component {
  //----------------- Render ------------------------------//
  render() {
    return (
        <CivFilters addCivToFilter={(event, index) => this.props.addCivToFilter(event, index)} isCivIn={this.props.isCivIn}/>
    );
  }
}

export {Filters};