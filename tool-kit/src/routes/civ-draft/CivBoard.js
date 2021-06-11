import React from 'react';
import "./CivBoard.css";


const CIVS = ['Aztecs', 'Berbers', 'Britons', 'Bulgarians', 'Burmese', 'Byzayntines', 'Celts', 
        'Chinese', 'Cumans', 'Ethiopians', 'Franks', 'Goths',' Huns', 'Incas', 
        'Indians', 'Italians', 'Japanese', 'Khmer', 'Koreans', 'Lithuanians', 'Magyars', 
        'Malay', 'Malians', 'Mayans', 'Mongols', 'Persians', 'Portuguese', 'Saracens', 
        'Slavs', 'Spanish', 'Tatars', 'Teutons', 'Turks', 'Vietnamese', 'Vikings']; 

// Remove element from array function (used in draftList) lol didn't know filter when I wrote this did I
function removeElement(arr, elem) {
    let index = arr.indexOf(elem);
    if (index > -1) {
        arr.splice(index, 1)
    }
}

// Get a random integer from 0 to n
function getRandInt(n) { 
    return Math.floor(Math.random() * Math.floor(n));
}

// Function to create Civ Board Buttons with properties
function CivBoardButton(props) {
    let buttonState = props.value ? "on-button" : "off-button";
    return (
        <button className={buttonState} onClick={props.onClick}>
            {props.name}
        </button>
    )
}

// Function to create Draft Board Buttons with properties 
function DraftBoardButton(props) {
    return (
        <button className="draft-button" onClick={props.onClick}>
            {props.name}
        </button>
    )
}

function PickCivButton(props) {
    return (
        <button className="pick-civ-button" onClick={props.onClick}>
            {props.name}
        </button>
    )
}

class CivBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            civButtons: Array(CIVS.length).fill(false),
            labels: CIVS, 
            draftList: [],
            civPick: "Click to Generate a Random Civ",
        };
    }

    handleCivClick(i) {
        // decide button boolean value
        let civButtons = this.state.civButtons.slice();
        civButtons[i] = this.state.civButtons[i] ? false : true;

        // add civ to draft board
        let temp = this.state.draftList.slice();
        civButtons[i] ? temp.push(this.state.labels[i]) : removeElement(temp, this.state.labels[i]);
        const draftList = temp.slice();

        // update state
        this.setState({
            civButtons: civButtons,
            draftList: draftList,
        });
    }

    handleDraftClick(i) {
        // updating the Civ Board buttos so that they have correct boolean value
        let civButtons = this.state.civButtons.slice();
        let name = this.state.draftList[i];
        let index = this.state.labels.indexOf(name);
        civButtons[index] = this.state.civButtons[index] ? false : true;
        
        // removing civ from draft board upon click
        let temp = this.state.draftList.slice();
        removeElement(temp,this.state.draftList[i]);
        const draftList = temp.slice();

        // update state
        this.setState({
            civButtons: civButtons, 
            draftList: draftList,
        });
    }

    handleCivPickClick() {
        let randCivIndex = getRandInt(this.state.draftList.length);
        let newCivPick = this.state.draftList[randCivIndex];
        this.setState({
            civPick: newCivPick,
        })
    }
    
    renderDraftBoardButton(i) {
        // don't render buttons with larger index value than draftList
        if (i > this.state.draftList.length - 1) {
            return;
        }

        // create button and pass Civ name and click method
        return (
            <DraftBoardButton
                name={this.state.draftList[i]}
                onClick = {() => this.handleDraftClick(i)}
            />
        )
    }

    renderCivBoardButton(i) {  
        // pass bool value, civ name and onClick method to CivBoardButtons
        return (
            <CivBoardButton
            value={this.state.civButtons[i]}
            name={this.state.labels[i]}  
            onClick = {() => this.handleCivClick(i)}
            />
        );
    }
    render() {
        return (
            <div className="board">
                <div className="civ-board">
                    {/* Civalization Board */}
                    <b> AOE2 CIVS</b>
                    <div className="civ-board-row">
                        {this.renderCivBoardButton(0)}
                        {this.renderCivBoardButton(1)}
                        {this.renderCivBoardButton(2)}
                        {this.renderCivBoardButton(3)}
                        {this.renderCivBoardButton(4)}
                        {this.renderCivBoardButton(5)}
                        {this.renderCivBoardButton(6)}
                    </div>
                    <div className="civ-board-row">
                        {this.renderCivBoardButton(7)}
                        {this.renderCivBoardButton(8)}
                        {this.renderCivBoardButton(9)}
                        {this.renderCivBoardButton(10)}
                        {this.renderCivBoardButton(11)}
                        {this.renderCivBoardButton(12)}
                        {this.renderCivBoardButton(13)}
                    </div>
                    <div className="civ-board-row">
                        {this.renderCivBoardButton(14)}
                        {this.renderCivBoardButton(15)}
                        {this.renderCivBoardButton(16)}
                        {this.renderCivBoardButton(17)}
                        {this.renderCivBoardButton(18)}
                        {this.renderCivBoardButton(19)}  
                        {this.renderCivBoardButton(20)}
                    </div>
                    <div className="civ-board-row">
                        {this.renderCivBoardButton(21)}
                        {this.renderCivBoardButton(22)}
                        {this.renderCivBoardButton(23)}
                        {this.renderCivBoardButton(24)}
                        {this.renderCivBoardButton(25)}
                        {this.renderCivBoardButton(26)}
                        {this.renderCivBoardButton(27)}
                    </div>
                    <div className="civ-board-row">
                        {this.renderCivBoardButton(28)}
                        {this.renderCivBoardButton(29)}
                        {this.renderCivBoardButton(30)}
                        {this.renderCivBoardButton(31)}
                        {this.renderCivBoardButton(32)}
                        {this.renderCivBoardButton(33)}
                        {this.renderCivBoardButton(34)}
                    </div>
                </div>
                
                <div className="draft-board">
                    {/* Draft Board */}
                    <b> Draft Board</b> 
                    <div className="draft-board-row"> 
                        {this.renderDraftBoardButton(0)}
                        {this.renderDraftBoardButton(1)}
                        {this.renderDraftBoardButton(2)}
                        {this.renderDraftBoardButton(3)}
                        {this.renderDraftBoardButton(4)}
                        {this.renderDraftBoardButton(5)}
                        {this.renderDraftBoardButton(6)}
                    </div>
                    <div className="draft-board-row"> 
                        {this.renderDraftBoardButton(7)}
                        {this.renderDraftBoardButton(8)}
                        {this.renderDraftBoardButton(9)}
                        {this.renderDraftBoardButton(10)}
                        {this.renderDraftBoardButton(11)}
                        {this.renderDraftBoardButton(12)}
                        {this.renderDraftBoardButton(13)}
                    </div>
                    <div className="draft-board-row"> 
                        {this.renderDraftBoardButton(14)}
                        {this.renderDraftBoardButton(15)}
                        {this.renderDraftBoardButton(16)}
                        {this.renderDraftBoardButton(17)}
                        {this.renderDraftBoardButton(18)}
                        {this.renderDraftBoardButton(19)}
                        {this.renderDraftBoardButton(20)}
                    </div>
                    <div className="draft-board-row"> 
                        {this.renderDraftBoardButton(21)}
                        {this.renderDraftBoardButton(22)}
                        {this.renderDraftBoardButton(23)}
                        {this.renderDraftBoardButton(24)}
                        {this.renderDraftBoardButton(25)}
                        {this.renderDraftBoardButton(26)}
                        {this.renderDraftBoardButton(27)}
                    </div>
                    <div className="draft-board-row"> 
                        {this.renderDraftBoardButton(28)}
                        {this.renderDraftBoardButton(29)}
                        {this.renderDraftBoardButton(30)}
                        {this.renderDraftBoardButton(31)}
                        {this.renderDraftBoardButton(32)}
                        {this.renderDraftBoardButton(33)}
                        {this.renderDraftBoardButton(34)}
                    </div>  
                </div>

                <div className="pick-board">  
                    <PickCivButton 
                        name={this.state.civPick}
                        onClick = {() => this.handleCivPickClick()}
                    />
                </div>
            </div>
        );
    }
}


export {CivBoard};