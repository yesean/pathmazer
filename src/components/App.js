import React, { useState } from 'react';
import './../styles/App.css';
import Grid from './Grid.js';
import TopBar from './TopBar.js';

function App() {
  const [grid] = useState(new Array(Grid.SIZE).fill(0));
  const [showPath, setShowPath] = useState(false);
  const [algorithm, setAlgorithm] = useState('');
  const [maze, setMaze] = useState('');
  const [lastSquare, setLastSquare] = useState(Grid.DEFAULT_SQ);
  const squareRefs = [];

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
    setShowPath(false);
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
        setShowPath={setShowPath}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        maze={maze}
        setMaze={setMaze}
      />
      <Grid.Grid
        grid={grid}
        // setGrid={setGrid}
        resetGrid={resetGrid}
        squareRefs={squareRefs}
        showPath={showPath}
        algorithm={algorithm}
        lastSquare={lastSquare}
        setLastSquare={setLastSquare}
      />
    </div>
  );
}

export default App;
