import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';
import TopBar from './components/TopBar';
import GridConstants from './GridConstants';

function App() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    resetGrid();
  }, []);

  const resetGrid = () => {
    console.log('resetting grid');
    const freshGrid = new Array(
      GridConstants.WIDTH * GridConstants.HEIGHT
    ).fill(GridConstants.DEFAULT_SQUARE);
    freshGrid[GridConstants.INITIAL_START] = GridConstants.START_SQUARE;
    freshGrid[GridConstants.INITIAL_END] = GridConstants.END_SQUARE;
    setGrid(freshGrid);
  };

  return (
    <div className='page'>
      <TopBar grid={grid} resetGrid={resetGrid} />
      <Grid grid={grid} />
    </div>
  );
}

export default App;
