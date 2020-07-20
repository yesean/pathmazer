import React from 'react';
import Select from './Select';
import './../styles/TopBar.css';
import Animations from './../services/Animations.js';
import Maze from './../services/Maze.js';

const TopBar = (props) => {
  const handleAlgorithmSubmit = (event) => {
    event.preventDefault();
    if (!props.isAnimating) {
      props.setIsAnimating(true);
      Animations.animate(props.algorithm, props.squareRefs, props.speed, true);
      // .then((e) => {
      //   console.log('animating finished')
      //   props.setIsAnimating(e)
      //   props.setIsAnimatingFinished(e)
      // })
      console.log('animating finished');
      props.setIsAnimating(false);
      props.setIsAnimatingFinished(true);
    }
  };

  const handleMazeSubmit = async (event) => {
    event.preventDefault();
    if (!props.isAnimating) {
      props.setIsAnimating(true);
      const hasBeenGenerated = await Maze.generateMaze(
        props.maze,
        props.squareRefs,
        props.resetGrid,
        props.speed
      );
      console.log('maze generation finished');
      props.setIsAnimating(hasBeenGenerated);
    }
  };

  const algorithmsMap = {
    dijkstra: 'Dijkstra',
    astar: 'A* Search',
    greedy: 'Greedy BFS',
    dfs: 'DFS',
    bfs: 'BFS',
  };
  const algorithmsPlaceholder = 'Select Algorithm';

  const mazesMap = {
    random: 'Random',
    dfs: 'DFS',
    recursiveDivision: 'Recursive Division',
    kruskal: 'Kruskal',
    prim: 'Prim',
  };
  const mazePlaceholder = 'Select Maze';

  const speedMap = {
    slow: 'Slow',
    medium: 'Medium',
    fast: 'Fast',
  };
  const speedPlaceholder = 'Select Speed';

  return (
    <div className='topBar'>
      <h1 className='title'>Path Visualizer</h1>
      <form className='algorithmForm' onSubmit={handleAlgorithmSubmit}>
        <Select
          option={props.algorithm}
          options={Object.keys(algorithmsMap)}
          optionsMap={algorithmsMap}
          setOption={props.setAlgorithm}
          placeholder={algorithmsPlaceholder}
        />
        <input className='visualizeButton' type='submit' value='Visualize' />
      </form>
      <div className='speedContainer'>
        <Select
          option={props.speed}
          options={Object.keys(speedMap)}
          optionsMap={speedMap}
          setOption={props.setSpeed}
          placeholder={speedPlaceholder}
        />
      </div>
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
      <button className='resetButton' onClick={props.resetGrid}>
        Reset
      </button>
    </div>
  );
};

export default TopBar;
