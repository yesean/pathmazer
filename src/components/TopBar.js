import React, { useEffect } from 'react';
import Select from './Select';
import './../styles/TopBar.css';
import Animations from './../services/Animations.js';
import Maze from './../services/Maze.js';

const TopBar = (props) => {
  const {
    squareRefs,
    resetGrid,
    setIsAnimating,
    setIsAnimatingFinished,
    algorithm,
    setAlgorithm,
    maze,
    setMaze,
    speed,
    setSpeed,
    isAnimating,
  } = props;
  const handleAlgorithmSubmit = async (event) => {
    event.preventDefault();
    console.log(isAnimating);
    if (!isAnimating) {
      setIsAnimating(true);
      const isAnimating = await Animations.animate(
        algorithm,
        squareRefs,
        speed,
        true
      );
      console.log('animating finished:', isAnimating);
      setIsAnimating(isAnimating);
      setIsAnimatingFinished(!isAnimating);
    }
  };

  const onAlgorithmChange = (alg) => {
    setAlgorithm(alg);
  };

  const onMazeChange = (maze) => {
    setMaze(maze);
  };

  useEffect(() => {
    (async () => {
      console.log('isAnimating:', isAnimating);
      if (!isAnimating) {
        setIsAnimating(true);
        const hasBeenGenerated = await Maze.generateMaze(
          maze,
          squareRefs,
          resetGrid,
          speed
        );
        console.log('hasBeenGenerated:', hasBeenGenerated);
        setIsAnimating(hasBeenGenerated);
      }
    })();
  }, [maze]);

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
          {/* <form className='algorithmForm' onSubmit={handleAlgorithmSubmit}> */}
          <Select
            option={algorithm}
            onChange={onAlgorithmChange}
            options={Object.keys(algorithmsMap)}
            optionsMap={algorithmsMap}
            placeholder={algorithmsPlaceholder}
          />
          {/* <input
              className={
                isAnimating ? 'topBarButtonWhileAnimating' : 'topBarButton'
              }
              type='submit'
              value='Visualize'
            /> */}
          {/* </form> */}
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
          <Select
            option={speed}
            options={Object.keys(speedMap)}
            optionsMap={speedMap}
            setOption={setSpeed}
            placeholder={speedPlaceholder}
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
        {/* </div>
        <div className='topBarItemContainer'> */}
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
