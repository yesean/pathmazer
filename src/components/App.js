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
  const [maze, setMaze] = useState(null);
  const [speed, setSpeed] = useState('medium');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingFinished, setIsAnimatingFinished] = useState(false);
  const [startSq, setStartSq] = useState(Grid.INITIAL_START);
  const [endSq, setEndSq] = useState(Grid.INITIAL_END);

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

  const resetGrid = () => {
    console.log('resetting grid');
    setGrid(initialGrid);
    setIsAnimatingFinished(false);
    setStartIsCovering(Grid.DEFAULT_SQ);
    setEndIsCovering(Grid.DEFAULT_SQ);
    setStartSq(Grid.INITIAL_START);
    setEndSq(Grid.INITIAL_END);
    setAlgorithm(null);
    setMaze(null);
    setSpeed('medium');
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
        setStartSq={setStartSq}
        setEndSq={setEndSq}
      />
      <div className='legendsContainer'>
        {legends.map((legend) => (
          <Legend name={legend.name} img={legend.img} />
        ))}
      </div>
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
        startSq={startSq}
        endSq={endSq}
        setStartSq={setStartSq}
        setEndSq={setEndSq}
      />
    </div>
  );
}

export default App;
