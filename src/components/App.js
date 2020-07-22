import React, { useState } from 'react';
import './../styles/App.css';
import Grid from './Grid.js';
import TopBar from './TopBar.js';

function App() {
  const initialGrid = new Array(Grid.SIZE).fill(Grid.DEFAULT_SQ);
  initialGrid[Grid.INITIAL_START] = Grid.START_SQ;
  initialGrid[Grid.INITIAL_END] = Grid.END_SQ;

  const [grid, setGrid] = useState(initialGrid);
  const [startIsCovering, setStartIsCovering] = useState(Grid.DEFAULT_SQ);
  const [endIsCovering, setEndIsCovering] = useState(Grid.DEFAULT_SQ);
  const [algorithm, setAlgorithm] = useState(null);
  const [maze, setMaze] = useState(null);
  const [speed, setSpeed] = useState('fast');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingFinished, setIsAnimatingFinished] = useState(false);

  const resetGrid = (shouldResetSelects = true) => {
    console.log('resetting grid');
    const nextGrid = new Array(Grid.SIZE).fill(Grid.DEFAULT_SQ);
    nextGrid[Grid.INITIAL_START] = Grid.START_SQ;
    nextGrid[Grid.INITIAL_END] = Grid.END_SQ;
    setGrid(nextGrid);
    setIsAnimatingFinished(false);
    setStartIsCovering(Grid.DEFAULT_SQ);
    setEndIsCovering(Grid.DEFAULT_SQ);
    if (shouldResetSelects) {
      setAlgorithm(null);
      setMaze(null);
      setSpeed(null);
    }
  };

  return (
    <div className='page'>
      <TopBar
        grid={grid}
        setGrid={setGrid}
        resetGrid={resetGrid}
        setIsAnimating={setIsAnimating}
        setIsAnimatingFinished={setIsAnimatingFinished}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        maze={maze}
        setMaze={setMaze}
        speed={speed}
        setSpeed={setSpeed}
        isAnimating={isAnimating}
      />
      <Grid.Grid
        grid={grid}
        setGrid={setGrid}
        startIsCovering={startIsCovering}
        setStartIsCovering={setStartIsCovering}
        endIsCovering={endIsCovering}
        setEndIsCovering={setEndIsCovering}
        resetGrid={resetGrid}
        isAnimating={isAnimating}
        isAnimatingFinished={isAnimatingFinished}
        algorithm={algorithm}
      />
    </div>
  );
}

export default App;
