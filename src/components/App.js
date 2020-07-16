import React, { useState, useEffect } from 'react';
import './../styles/App.css';
import Grid from './Grid.js';
import TopBar from './TopBar.js';
import GridConstants from './../services/GridConstants.js';

function App() {
  const [grid, setGrid] = useState([]);
  const [finished, setFinished] = useState(false);
  const [algorithm, setAlgorithm] = useState('');
  const [maze, setMaze] = useState('');
  const [lastSquare, setLastSquare] = useState(GridConstants.DEFAULT_SQUARE);
  const squareRefs = [];

  useEffect(() => {
    const freshGrid = new Array(
      GridConstants.WIDTH * GridConstants.HEIGHT
    ).fill(GridConstants.DEFAULT_SQUARE);
    freshGrid[GridConstants.INITIAL_START] = GridConstants.START_SQUARE;
    freshGrid[GridConstants.INITIAL_END] = GridConstants.END_SQUARE;
    setGrid(freshGrid);
  }, []);

  const resetGrid = (resetSelects = true) => {
    console.log('resetting grid');
    squareRefs.forEach((ref, index) => {
      ref.current.className =
        index === GridConstants.INITIAL_START
          ? GridConstants.START_SQUARE
          : index === GridConstants.INITIAL_END
          ? GridConstants.END_SQUARE
          : GridConstants.DEFAULT_SQUARE;
    });
    setFinished(false);
    setLastSquare(GridConstants.DEFAULT_SQUARE);
    if (resetSelects) {
      setAlgorithm('');
      setMaze('');
    }
  };

  return (
    <div className='page'>
      <TopBar
        squareRefs={squareRefs}
        resetGrid={resetGrid}
        setFinished={setFinished}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        maze={maze}
        setMaze={setMaze}
      />
      <Grid
        grid={grid}
        setGrid={setGrid}
        squareRefs={squareRefs}
        finished={finished}
        algorithm={algorithm}
        lastSquare={lastSquare}
        setLastSquare={setLastSquare}
      />
    </div>
  );
}

export default App;
