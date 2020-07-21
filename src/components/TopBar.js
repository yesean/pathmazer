import React from 'react';
import Select from './Select';
import './../styles/TopBar.css';
import Animations from './../services/Animations.js';
import Maze from './../services/Maze.js';

const TopBar = (props) => {
  const handleAlgorithmSubmit = async (event) => {
    event.preventDefault();
    console.log(props.isAnimating);
    if (!props.isAnimating) {
      props.setIsAnimating(true);
      const isAnimating = await Animations.animate(
        props.algorithm,
        props.squareRefs,
        props.speed,
        true
      );
      console.log('animating finished:', isAnimating);
      props.setIsAnimating(isAnimating);
      props.setIsAnimatingFinished(!isAnimating);
    }
  };

  const handleMazeSubmit = async (event) => {
    event.preventDefault();
    console.log('isAnimating:', props.isAnimating);
    if (!props.isAnimating) {
      props.setIsAnimating(true);
      const hasBeenGenerated = await Maze.generateMaze(
        props.maze,
        props.squareRefs,
        props.resetGrid,
        props.speed
      );
      console.log('hasBeenGenerated:', hasBeenGenerated);
      props.setIsAnimating(hasBeenGenerated);
    }
  };

  const handleResetClick = (e) => {
    if (!props.isAnimating) {
      e.preventDefault();
      props.resetGrid();
    }
  };

  const algorithmsMap = {
    dijkstra: 'Dijkstra',
    astar: 'A* Search',
    greedy: 'Greedy BFS',
    dfs: 'DFS',
    bfs: 'BFS',
  };
  const algorithmsPlaceholder = 'Algorithm';

  const mazesMap = {
    random: 'Random',
    dfs: 'DFS',
    recursiveDivision: 'Recursive Division',
    kruskal: 'Kruskal',
    prim: 'Prim',
  };
  const mazePlaceholder = 'Maze';

  const speedMap = {
    slow: 'Slow',
    medium: 'Medium',
    fast: 'Fast',
  };
  const speedPlaceholder = 'Speed';

  return (
    <div className='topBar'>
      <h1 className='title'>Path Visualizer</h1>
      <div className='optionsContainer'>
        <div className='formContainer'>
          <form className='algorithmForm' onSubmit={handleAlgorithmSubmit}>
            <Select
              option={props.algorithm}
              options={Object.keys(algorithmsMap)}
              optionsMap={algorithmsMap}
              setOption={props.setAlgorithm}
              placeholder={algorithmsPlaceholder}
            />
            <input
              className={
                props.isAnimating
                  ? 'topBarButtonWhileAnimating'
                  : 'topBarButton'
              }
              type='submit'
              value='Visualize'
            />
          </form>
        </div>
        <div className='formContainer'>
          <form className='mazeForm' onSubmit={handleMazeSubmit}>
            <Select
              option={props.maze}
              options={Object.keys(mazesMap)}
              optionsMap={mazesMap}
              setOption={props.setMaze}
              placeholder={mazePlaceholder}
            />
            <input
              className={
                props.isAnimating
                  ? 'topBarButtonWhileAnimating'
                  : 'topBarButton'
              }
              type='submit'
              value='Generate Maze'
            />
          </form>
        </div>
        <div className='speedContainer'>
          <Select
            option={props.speed}
            options={Object.keys(speedMap)}
            optionsMap={speedMap}
            setOption={props.setSpeed}
            placeholder={speedPlaceholder}
          />
        </div>
        <div className='resetButtonContainer'>
          <button
            className={
              (props.isAnimating
                ? 'topBarButtonWhileAnimating'
                : 'topBarButton') + ' resetButton'
            }
            onClick={handleResetClick}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
