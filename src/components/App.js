import React, { useState, useEffect } from 'react';
import './../styles/App.css';
import Grid from './Grid.js';
import TopBar from './TopBar.js';
// import Gridfrom './../services/Grid.js';

function App() {
  const [grid, setGrid] = useState([]);
  const [finished, setFinished] = useState(false);
  const [algorithm, setAlgorithm] = useState('');
  const [maze, setMaze] = useState('');
  const [lastSquare, setLastSquare] = useState(Grid.DEFAULT_SQ);
  const squareRefs = [];

  useEffect(() => {
    const freshGrid = new Array(Grid.WIDTH * Grid.HEIGHT).fill(
      Grid.DEFAULT_SQ
    );
    freshGrid[Grid.INITIAL_START] = Grid.START_SQ;
    freshGrid[Grid.INITIAL_END] = Grid.END_SQ;
    setGrid(freshGrid);
  }, []);

  const resetGrid = (resetSelects = true) => {
    console.log('resetting grid');
    squareRefs.forEach((ref, index) => {
      ref.current.className =
        index === Grid.INITIAL_START
          ? Grid.START_SQ
          : index === Grid.INITIAL_END
          ? Grid.END_SQ
          : Grid.DEFAULT_SQ;
    });
    setFinished(false);
    setLastSquare(Grid.DEFAULT_SQ);
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
      <Grid.Grid
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
