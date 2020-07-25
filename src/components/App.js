import React, { useState } from 'react';
import './../styles/App.css';
import Grid from './Grid.js';
import TopBar from './TopBar.js';
import Legend from './Legend.js';
import weight from './../images/weight.svg';
import start from './../images/start.svg';
import end from './../images/end.svg';

function App() {
  const initialGrid = new Array(Grid.SIZE).fill(Grid.DEFAULT_SQ);
  initialGrid[Grid.INITIAL_START] = Grid.START_SQ;
  initialGrid[Grid.INITIAL_END] = Grid.END_SQ;

  const [grid, setGrid] = useState(initialGrid);
  const [startIsCovering, setStartIsCovering] = useState(Grid.DEFAULT_SQ);
  const [endIsCovering, setEndIsCovering] = useState(Grid.DEFAULT_SQ);
  const [algorithm, setAlgorithm] = useState(null);
  const [speed, setSpeed] = useState('fast');
  const [maze, setMaze] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingFinished, setIsAnimatingFinished] = useState(false);

  const resetGrid = () => {
    setGrid(initialGrid);
    setIsAnimatingFinished(false);
    setStartIsCovering(Grid.DEFAULT_SQ);
    setEndIsCovering(Grid.DEFAULT_SQ);
    setAlgorithm(null);
    setMaze(null);
    setSpeed('fast');
  };

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
      <Grid.Grid
        grid={grid}
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
