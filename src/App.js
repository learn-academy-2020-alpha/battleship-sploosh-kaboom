import React, {Component} from 'react';
import './App.css';
import Game from './components/Game';

class App extends Component {
  render(){
    return (
      <div className = "background">
        <h1 className = "header">⛴ BattleShip ⛴</h1>
        <Game/>
      </div>
    )
  }
}

export default App;