import React from 'react';
// import Select from 'react-select';
import Select from './Select';
import './../styles/TopBar.css';
import Animations from './../services/Animations.js';
import Maze from './../services/Maze.js';

const TopBar = (props) => {
  const handleAlgorithmSubmit = (event) => {
    event.preventDefault();
    if (Animations.animate(props.algorithm, props.squareRefs, true)) {
      props.setFinished(true);
    }
  };

  const handleMazeSubmit = (event) => {
    event.preventDefault();
    Maze.generateMaze(props.maze, props.squareRefs, props.resetGrid);
  };

  const algorithmsMap = {
    dijkstra: 'Dijkstra',
    astar: 'A* Search',
  };
  const algorithmsPlaceholder = 'Select Algorithm';

  const mazesMap = {
    random: 'Random',
    dfs: 'DFS',
  };
  const mazePlaceholder = 'Select Maze';

  return (
    <div className='topBarContainer'>
      <ul className='topBar'>
        <li>
          {/* <form className='algorithmForm' onSubmit={handleAlgorithmSubmit}> */}
          <Select
            option={props.algorithm}
            options={Object.keys(algorithmsMap)}
            optionsMap={algorithmsMap}
            setOption={props.setAlgorithm}
            placeholder={algorithmsPlaceholder}
          />
          {/* <input
              className='visualizeButton'
              type='submit'
              value='Visualize'
            /> */}
          {/* </form> */}
        </li>
        <li className='mazeButtonContainer'>
          <form className='mazeForm' onSubmit={handleMazeSubmit}>
            <Select
              option={props.maze}
              options={Object.keys(mazesMap)}
              optionsMap={mazesMap}
              setOption={props.setMaze}
              placeholder={mazePlaceholder}
            />
            <input className='mazeButton' type='submit' value='Generate Maze' />
          </form>
        </li>
        <li className='resetButtonContainer'>
          <button className='resetButton' onClick={handleAlgorithmSubmit}>
            Visualize
          </button>
          <button className='resetButton' onClick={props.resetGrid}>
            Reset
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
