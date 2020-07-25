import React, { useState } from 'react';
import './../styles/Grid.css';
import Square from './Square.js';
import Animations from './../services/Animations.js';
import GridConstants from './../services/GridConstants.js';

const Grid = ({
  grid,
  gridStyle,
  setGrid,
  startIsCovering,
  setStartIsCovering,
  endIsCovering,
  setEndIsCovering,
  isAnimating,
  isAnimatingFinished,
  algorithm,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHoldingStart, setIsHoldingStart] = useState(false);
  const [isHoldingEnd, setIsHoldingEnd] = useState(false);
  const [isWDown, setIsWDown] = useState(false);

  const updateGridOnMouseDown = (sq) => {
    const nextGrid = [...grid];
    if (grid[sq] === GridConstants.START_SQ) {
      setIsHoldingStart(true);
    } else if (grid[sq] === GridConstants.END_SQ) {
      setIsHoldingEnd(true);
    } else if (grid[sq] === GridConstants.WEIGHT_SQ) {
      if (isWDown) {
        nextGrid[sq] = GridConstants.DEFAULT_SQ;
      } else {
        nextGrid[sq] = GridConstants.WALL_SQ;
      }
    } else if (grid[sq] === GridConstants.WALL_SQ) {
      if (isWDown) {
        nextGrid[sq] = GridConstants.WEIGHT_SQ;
      } else {
        nextGrid[sq] = GridConstants.DEFAULT_SQ;
      }
    } else {
      if (isWDown) {
        nextGrid[sq] = GridConstants.WEIGHT_SQ;
      } else {
        nextGrid[sq] = GridConstants.WALL_SQ;
      }
    }
    setGrid(nextGrid);
  };

  const updateGridOnMouseEnter = (sq) => {
    const startSq = grid.findIndex((s) => s === GridConstants.START_SQ);
    const endSq = grid.findIndex((s) => s === GridConstants.END_SQ);
    if (isMouseDown && (sq !== startSq) & (sq !== endSq)) {
      const nextGrid = [...grid];
      if (isHoldingStart) {
        nextGrid[startSq] = startIsCovering;
        nextGrid[sq] = GridConstants.START_SQ;
        setStartIsCovering(grid[sq]);
        if (isAnimatingFinished) {
          Animations.animate(algorithm, nextGrid, setGrid, 'none');
          return;
        }
      } else if (isHoldingEnd) {
        nextGrid[endSq] = endIsCovering;
        nextGrid[sq] = GridConstants.END_SQ;
        setEndIsCovering(grid[sq]);
        if (isAnimatingFinished) {
          Animations.animate(algorithm, nextGrid, setGrid, 'none');
          return;
        }
      } else {
        if (grid[sq] === GridConstants.WEIGHT_SQ) {
          if (isWDown) {
            nextGrid[sq] = GridConstants.DEFAULT_SQ;
          } else {
            nextGrid[sq] = GridConstants.WALL_SQ;
          }
        } else if (grid[sq] === GridConstants.WALL_SQ) {
          if (isWDown) {
            nextGrid[sq] = GridConstants.WEIGHT_SQ;
          } else {
            nextGrid[sq] = GridConstants.DEFAULT_SQ;
          }
        } else {
          if (isWDown) {
            nextGrid[sq] = GridConstants.WEIGHT_SQ;
          } else {
            nextGrid[sq] = GridConstants.WALL_SQ;
          }
        }
      }
      setGrid(nextGrid);
    }
  };

  const onMouseEnter = (sq) => {
    if (!isAnimating) {
      updateGridOnMouseEnter(sq);
    }
  };

  const onMouseDown = (sq) => {
    if (!isAnimating) {
      updateGridOnMouseDown(sq);
      setIsMouseDown(true);
    }
  };

  const onMouseUp = (sq) => {
    if (!isAnimating) {
      if (isHoldingStart) {
        setIsHoldingStart(false);
      } else if (isHoldingEnd) {
        setIsHoldingEnd(false);
      }
      setIsMouseDown(false);
    }
  };

  const onKeyDown = (e) => {
    if (!isAnimating) {
      if (e.key === 'w') {
        setIsWDown(true);
      }
    }
  };

  const onKeyUp = (e) => {
    if (!isAnimating) {
      if (e.key === 'w') {
        setIsWDown(false);
      }
    }
  };

  const renderSquare = (sqType, sq) => {
    return (
      <Square
        key={sq}
        id={sq}
        className={sqType}
        onMouseEnter={() => onMouseEnter(sq)}
        onMouseDown={() => onMouseDown(sq)}
        onMouseUp={() => onMouseUp(sq)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />
    );
  };

  const renderGrid = () => {
    console.log(grid[GridConstants.INITIAL_START]);
    return grid.map((sqType, sq) => renderSquare(sqType, sq));
  };

  return (
    <div style={gridStyle} className='grid'>
      {renderGrid()}
    </div>
  );
};

export default Grid;
