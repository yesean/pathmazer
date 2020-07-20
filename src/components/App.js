import React, { useState } from 'react';
import './../styles/App.css';
import Grid from './Grid.js';
import TopBar from './TopBar.js';

function App() {
  const [grid] = useState(new Array(Grid.SIZE).fill(0));
  const [lastSquare, setLastSquare] = useState(Grid.DEFAULT_SQ);
  const [algorithm, setAlgorithm] = useState(null);
  const [maze, setMaze] = useState(null);
  const [speed, setSpeed] = useState('fast');
  const [isAnimatingFinished, setIsAnimatingFinished] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const squareRefs = [];

  const resetGrid = (shouldResetSelects = true) => {
    console.log('resetting grid');
    squareRefs.forEach((ref, index) => {
      ref.current.className =
        index === Grid.INITIAL_START
          ? Grid.START_SQ
          : index === Grid.INITIAL_END
          ? Grid.END_SQ
          : Grid.DEFAULT_SQ;
    });
    setIsAnimatingFinished(false);
    setLastSquare(Grid.DEFAULT_SQ);
    if (shouldResetSelects) {
      setAlgorithm(null);
      setMaze(null);
      setSpeed(null);
    }
  };

  return (
    <div className='page'>
      <TopBar
        squareRefs={squareRefs}
        resetGrid={resetGrid}
        setIsAnimatingFinished={setIsAnimatingFinished}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        maze={maze}
        setMaze={setMaze}
        speed={speed}
        setSpeed={setSpeed}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />
      <Grid.Grid
        grid={grid}
        // setGrid={setGrid}
        resetGrid={resetGrid}
        squareRefs={squareRefs}
        isAnimatingFinished={isAnimatingFinished}
        algorithm={algorithm}
        lastSquare={lastSquare}
        setLastSquare={setLastSquare}
      />
    </div>
  );
}

export default App;
