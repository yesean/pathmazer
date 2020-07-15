import React, { useState } from 'react';
import './../styles/TopBar.css';
import * as Animations from './Animate';
import Maze from './Maze';

const TopBar = (props) => {
  const [algorithm, setAlgorithm] = useState('');

  const handleChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    switch (algorithm) {
      case 'dijkstra':
        Animations.animateDijkstra();
        break;
      case 'astar':
        Animations.animateAstar();
        break;
      default:
    }
  };

  return (
    <ul className='topBar'>
      <li>
        <form className='algorithmForm' onSubmit={handleSubmit}>
          <select value={algorithm} onChange={handleChange}>
            <option value='' disabled>
              Select Algorithm
            </option>
            <option value='dijkstra'>Dijkstra</option>
            <option value='astar'>A* Search</option>
          </select>
          <input type='submit' value='Visualize' />
        </form>
      </li>
      <li>
        <button onClick={props.resetGrid}>Reset</button>
      </li>
      <li>
        <button onClick={() => Maze.generateMaze(props.grid)}>Maze</button>
      </li>
    </ul>
  );
};

export default TopBar;
