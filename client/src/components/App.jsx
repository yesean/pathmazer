import React, { useState, useEffect, useCallback } from 'react';
import Grid from './Grid.jsx';
import TopBar from './TopBar.jsx';
import Tutorial from './Tutorial.jsx';
import Legends from './Legends.jsx';
import GridConstants from '../services/GridConstants';
import '../styles/App.css';

import github from '../images/github.png';
import linkedin from '../images/linkedin.png';

function App() {
  const [grid, setGrid] = useState(null);
  const [startIsCovering, setStartIsCovering] = useState(
    GridConstants.DEFAULT_SQ
  );
  const [endIsCovering, setEndIsCovering] = useState(GridConstants.DEFAULT_SQ);
  const [isTutorialShowing, setIsTutorialShowing] = useState(true);
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [speed, setSpeed] = useState('fast');
  const [maze, setMaze] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingFinished, setIsAnimatingFinished] = useState(false);

  const resetGrid = useCallback(() => {
    setGrid(null);
    setGrid([...GridConstants.INITIAL_GRID]);
    setIsAnimatingFinished(false);
    setStartIsCovering(GridConstants.DEFAULT_SQ);
    setEndIsCovering(GridConstants.DEFAULT_SQ);
    setAlgorithm('dijkstra');
    setMaze(null);
    setSpeed('fast');
  }, []);

  // initialize window
  useEffect(() => {
    updateDimensions();
    resetGrid();
  }, [resetGrid]);

  // update grid on resize
  useEffect(() => {
    const resizeAndReset = () => {
      updateDimensions();
      resetGrid();
    };
    if (!isAnimating) {
      window.addEventListener('resize', resizeAndReset);
      return () => window.removeEventListener('resize', resizeAndReset);
    }
  }, [isAnimating, resetGrid]);

  const updateDimensions = () => {
    const topBarHeight = document.getElementsByClassName('topBar')[0]
      .offsetHeight;
    const legendsHeight = document.getElementsByClassName('legendsContainer')[0]
      .offsetHeight;
    const footerHeight = document.getElementsByClassName('footer')[0]
      .offsetHeight;
    const gridVerticalMargin = 20;
    const gridHorizontalMargin = 30;
    const footerBottomMargin = 16;
    let width = Math.floor((window.innerWidth - gridHorizontalMargin) / 25);
    let height = Math.floor(
      (window.innerHeight -
        topBarHeight -
        legendsHeight -
        footerHeight -
        footerBottomMargin -
        gridVerticalMargin) /
        25
    );
    // minimum width and height
    if (width < 10) width = 10;
    if (height < 5) height = 5;
    GridConstants.update(width, height);
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${GridConstants.WIDTH}, 25px)`,
    gridTemplateRows: `repeat(${GridConstants.HEIGHT}, 25px)`,
  };

  return (
    <div className="page">
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
        isTutorialShowing={isTutorialShowing}
      />
      <Legends />
      {grid && (
        <Grid
          grid={grid}
          gridStyle={gridStyle}
          setGrid={setGrid}
          startIsCovering={startIsCovering}
          setStartIsCovering={setStartIsCovering}
          endIsCovering={endIsCovering}
          setEndIsCovering={setEndIsCovering}
          isAnimating={isAnimating}
          isAnimatingFinished={isAnimatingFinished}
          algorithm={algorithm}
          isTutorialShowing={isTutorialShowing}
        />
      )}
      <Footer />
      <Tutorial
        shouldShow={isTutorialShowing}
        setShouldShow={setIsTutorialShowing}
      />
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="footer">
      &copy; 2020 Sean Ye{'  '}
      <a
        className="footerAnchor"
        href="https://github.com/seanye24/pathmaze-visualizer"
      >
        <img className="footerIcon" src={github} alt="github" />
      </a>{' '}
      <a
        className="footerAnchor"
        href="https://www.linkedin.com/in/sean-y-265766122/"
      >
        <img className="footerIcon" src={linkedin} alt="linkedin" />
      </a>
    </footer>
  );
};

export default App;
