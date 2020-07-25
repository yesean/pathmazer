import React, { useState, useEffect } from 'react';
import Grid from './Grid.js';
import TopBar from './TopBar.js';
import Legend from './Legend.js';
import GridConstants from './../services/GridConstants.js';
import './../styles/App.css';

import weight from './../images/weight.svg';
import start from './../images/start.svg';
import end from './../images/end.svg';

function App() {
  const [grid, setGrid] = useState(GridConstants.INITIAL_GRID);
  const [startIsCovering, setStartIsCovering] = useState(
    GridConstants.DEFAULT_SQ
  );
  const [endIsCovering, setEndIsCovering] = useState(GridConstants.DEFAULT_SQ);
  const [algorithm, setAlgorithm] = useState(null);
  const [speed, setSpeed] = useState('fast');
  const [maze, setMaze] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingFinished, setIsAnimatingFinished] = useState(false);

  const resetGrid = () => {
    setGrid(GridConstants.INITIAL_GRID);
    setIsAnimatingFinished(false);
    setStartIsCovering(GridConstants.DEFAULT_SQ);
    setEndIsCovering(GridConstants.DEFAULT_SQ);
    setAlgorithm(null);
    setMaze(null);
    setSpeed('fast');
  };

  useEffect(() => {
    const updateDimensions = () => {
      const topBarHeight = document.getElementsByClassName('topBar')[0]
        .offsetHeight;
      const legendsHeight = document.getElementsByClassName(
        'legendsContainer'
      )[0].offsetHeight;
      const gridMargin = 20;
      GridConstants.update(
        Math.floor((window.innerWidth - 25) / 25),
        Math.floor(
          (window.innerHeight - topBarHeight - legendsHeight - gridMargin) / 25
        )
      );
      resetGrid();
    };
    updateDimensions();
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (!isAnimating) {
        const topBarHeight = document.getElementsByClassName('topBar')[0]
          .offsetHeight;
        const legendsHeight = document.getElementsByClassName(
          'legendsContainer'
        )[0].offsetHeight;
        const gridMargin = 20;
        GridConstants.update(
          Math.floor((window.innerWidth - 25) / 25),
          Math.floor(
            (window.innerHeight - topBarHeight - legendsHeight - gridMargin) /
              25
          )
        );
        resetGrid();
      }
    };
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isAnimating]);

  const legends = [
    {
      name: 'Start',
      img: start,
    },
    {
      name: 'End',
      img: end,
    },
    {
      name: 'Weight',
      img: weight,
    },
    {
      name: 'Wall',
    },
    {
      name: 'Visited',
    },
    {
      name: 'Path',
    },
  ];

  const gridStyle = {
    gridTemplateColumns: `repeat(${GridConstants.WIDTH}, 25px)`,
    gridTemplateRows: `repeat(${GridConstants.HEIGHT}, 25px)`,
  };

  return (
    <div className='page'>
      <TopBar
        grid={grid}
        setGrid={setGrid}
        resetGrid={resetGrid}
        setStartIsCovering={setStartIsCovering}
        setEndIsCovering={setEndIsCovering}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
        setIsAnimatingFinished={setIsAnimatingFinished}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        speed={speed}
        setSpeed={setSpeed}
        maze={maze}
        setMaze={setMaze}
      />
      <div className='legendsContainer'>
        {legends.map((legend) => (
          <Legend key={legend.name} name={legend.name} img={legend.img} />
        ))}
      </div>
      <Grid
        grid={grid}
        gridStyle={gridStyle}
        setGrid={setGrid}
        resetGrid={resetGrid}
        startIsCovering={startIsCovering}
        setStartIsCovering={setStartIsCovering}
        endIsCovering={endIsCovering}
        setEndIsCovering={setEndIsCovering}
        isAnimating={isAnimating}
        isAnimatingFinished={isAnimatingFinished}
        algorithm={algorithm}
      />
    </div>
  );
}

export default App;
