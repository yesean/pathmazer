import React from 'react';
import Select from './Select';
import './../styles/TopBar.css';
import Animations from './../services/Animations.js';
import Maze from './../services/Maze.js';
import Grid from './Grid';

const TopBar = ({
  grid,
  setGrid,
  resetGrid,
  setStartIsCovering,
  setEndIsCovering,
  isAnimating,
  setIsAnimating,
  setIsAnimatingFinished,
  algorithm,
  setAlgorithm,
  maze,
  setMaze,
  speed,
  setSpeed,
}) => {
  const handleAlgorithmSubmit = async (event) => {
    event.preventDefault();
    if (!isAnimating) {
      setIsAnimating(true);
      const promise = await Animations.animate(algorithm, grid, setGrid, speed);
      setIsAnimating(promise.isAnimating);
      setIsAnimatingFinished(promise.isAnimatingFinished);
    }
  };

  const handleMazeSubmit = async (maze) => {
    if (!isAnimating) {
      setIsAnimating(true);
      const promise = await Maze.generateMaze(maze, grid, setGrid, resetGrid);
      setStartIsCovering(Grid.DEFAULT_SQ);
      setEndIsCovering(Grid.DEFAULT_SQ);
      setIsAnimating(promise.finished);
      setIsAnimatingFinished(false);
    }
  };

  const onAlgorithmChange = (alg) => {
    setAlgorithm(alg);
  };

  const onMazeChange = (maze) => {
    setMaze(maze);
    handleMazeSubmit(maze);
  };

  const onSpeedChange = (speed) => {
    setSpeed(speed);
  };

  const handleResetClick = (e) => {
    if (!isAnimating) {
      e.preventDefault();
      resetGrid();
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
        <div className='topBarItemContainer'>
          <Select
            option={algorithm}
            onChange={onAlgorithmChange}
            options={Object.keys(algorithmsMap)}
            optionsMap={algorithmsMap}
            placeholder={algorithmsPlaceholder}
          />
        </div>
        <div className='topBarItemContainer'>
          <Select
            option={speed}
            onChange={onSpeedChange}
            options={Object.keys(speedMap)}
            optionsMap={speedMap}
            placeholder={speedPlaceholder}
          />
        </div>
        <div className='topBarItemContainer'>
          <Select
            option={maze}
            onChange={onMazeChange}
            options={Object.keys(mazesMap)}
            optionsMap={mazesMap}
            placeholder={mazePlaceholder}
          />
        </div>
        <div className='topBarItemContainer'>
          <button
            className={
              isAnimating ? 'topBarButtonWhileAnimating' : 'topBarButton'
            }
            onClick={handleAlgorithmSubmit}>
            Visualize
          </button>
          <button
            className={
              (isAnimating ? 'topBarButtonWhileAnimating' : 'topBarButton') +
              ' resetButton'
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
