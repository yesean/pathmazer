import React, { useState } from 'react';
import './../styles/Grid.css';
import Square from './Square.js';
import Animations from './../services/Animations.js';

const WIDTH = 67;
const HEIGHT = 45;
const SIZE = WIDTH * HEIGHT;
const INITIAL_START = 22 * WIDTH + 6;
const INITIAL_END = 22 * WIDTH + 60;
const DEFAULT_SQ = 'square';
const START_SQ = 'startSquare';
const END_SQ = 'endSquare';
const WALL_SQ = 'wallSquare';
const WEIGHT_SQ = 'weightSquare';
const VISITED_SQ = 'visitedSquare';
const VISITED_WEIGHT_SQ = 'visitedWeightSquare';
const VISITED_HEAD_SQ = 'visitedHeadSquare';
const VISITED_FINISHED_SQ = 'visitedFinishedSquare';
const VISITED_FINISHED_WEIGHT_SQ = 'visitedFinishedWeightSquare';
const PATH_SQ = 'pathSquare';
const PATH_WEIGHT_SQ = 'pathWeightSquare';
const PATH_HEAD_SQ = 'pathHeadSquare';
const PATH_FINISHED_SQ = 'pathFinishedSquare';
const PATH_FINISHED_WEIGHT_SQ = 'pathFinishedWeightSquare';

const getRow = (sq) => {
  return Math.floor(sq / WIDTH);
};

const getCol = (sq) => {
  return sq % WIDTH;
};

const getCoor = (sq) => {
  return [getRow(sq), getCol(sq)];
};

const getSq = (row, col) => {
  return row * WIDTH + col;
};

const dist = (start, end) =>
  Math.abs(getRow(start) - getRow(end)) + Math.abs(getCol(start) - getCol(end));

const validMove = (start, end) => {
  return end < SIZE && end >= 0 && Math.abs(getCol(end) - getCol(start)) <= 2;
};

const validMazeMove = (start, end) => {
  const [endRow, endCol] = getCoor(end);
  return (
    endRow >= 1 &&
    endRow < HEIGHT - 1 &&
    endCol >= 1 &&
    endCol < WIDTH - 1 &&
    validMove(start, end)
  );
};

const Grid = ({
  grid,
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
    if (grid[sq] === START_SQ) {
      setIsHoldingStart(true);
    } else if (grid[sq] === END_SQ) {
      setIsHoldingEnd(true);
    } else if (grid[sq] === WEIGHT_SQ) {
      if (isWDown) {
        nextGrid[sq] = DEFAULT_SQ;
      } else {
        nextGrid[sq] = WALL_SQ;
      }
    } else if (grid[sq] === WALL_SQ) {
      if (isWDown) {
        nextGrid[sq] = WEIGHT_SQ;
      } else {
        nextGrid[sq] = DEFAULT_SQ;
      }
    } else {
      if (isWDown) {
        nextGrid[sq] = WEIGHT_SQ;
      } else {
        nextGrid[sq] = WALL_SQ;
      }
    }
    setGrid(nextGrid);
  };

  const updateGridOnMouseEnter = (sq) => {
    const startSq = grid.findIndex((s) => s === START_SQ);
    const endSq = grid.findIndex((s) => s === END_SQ);
    console.log(isMouseDown);
    if (isMouseDown && (sq !== startSq) & (sq !== endSq)) {
      const nextGrid = [...grid];
      if (isHoldingStart) {
        nextGrid[startSq] = startIsCovering;
        nextGrid[sq] = START_SQ;
        setStartIsCovering(grid[sq]);
        if (isAnimatingFinished) {
          Animations.animate(algorithm, nextGrid, setGrid, 'none');
          return;
        }
      } else if (isHoldingEnd) {
        nextGrid[endSq] = endIsCovering;
        nextGrid[sq] = END_SQ;
        setEndIsCovering(grid[sq]);
        if (isAnimatingFinished) {
          Animations.animate(algorithm, nextGrid, setGrid, 'none');
          return;
        }
      } else {
        if (grid[sq] === WEIGHT_SQ) {
          if (isWDown) {
            nextGrid[sq] = DEFAULT_SQ;
          } else {
            nextGrid[sq] = WALL_SQ;
          }
        } else if (grid[sq] === WALL_SQ) {
          if (isWDown) {
            nextGrid[sq] = WEIGHT_SQ;
          } else {
            nextGrid[sq] = DEFAULT_SQ;
          }
        } else {
          if (isWDown) {
            nextGrid[sq] = WEIGHT_SQ;
          } else {
            nextGrid[sq] = WALL_SQ;
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
    console.log('mouse down');
    if (!isAnimating) {
      updateGridOnMouseDown(sq);
      setIsMouseDown(true);
    }
  };

  const onMouseUp = (sq) => {
    console.log('mouse up');
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
    return grid.map((sqType, sq) => renderSquare(sqType, sq));
  };

  return <div className='grid'>{renderGrid()}</div>;
};

export default {
  Grid,
  WIDTH,
  HEIGHT,
  SIZE,
  INITIAL_START,
  INITIAL_END,
  DEFAULT_SQ,
  START_SQ,
  END_SQ,
  WALL_SQ,
  WEIGHT_SQ,
  VISITED_SQ,
  VISITED_WEIGHT_SQ,
  VISITED_HEAD_SQ,
  VISITED_FINISHED_SQ,
  VISITED_FINISHED_WEIGHT_SQ,
  PATH_SQ,
  PATH_WEIGHT_SQ,
  PATH_HEAD_SQ,
  PATH_FINISHED_SQ,
  PATH_FINISHED_WEIGHT_SQ,
  getRow,
  getCol,
  getCoor,
  getSq,
  dist,
  validMove,
  validMazeMove,
};
