import React, { useState, useEffect } from 'react';
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
  resetGrid,
  squareRefs,
  isAnimating,
  isAnimatingFinished,
  algorithm,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHoldingStart, setIsHoldingStart] = useState(false);
  const [isHoldingEnd, setIsHoldingEnd] = useState(false);
  const [startSq, setStartSq] = useState(INITIAL_START);
  const [endSq, setEndSq] = useState(INITIAL_END);
  const [isWDown, setIsWDown] = useState(false);
  const [mouseOver, setMouseOver] = useState(-1);

  const renderSquare = (sq, id) => {
    return (
      <Square
        key={id}
        id={id}
        className={sq}
        // squareRefs={squareRefs}
        onMouseDown={() => onMouseDown(id)}
        onMouseUp={() => onMouseUp(id)}
        onMouseOver={() => onMouseOver(id)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />
    );
  };

  const renderGrid = () => {
    return grid.map((sq, ind) => renderSquare(sq, ind));
  };

  useEffect(() => {
    if (isMouseDown && !isAnimating) {
      const nextGrid = [...grid];
      if (
        isHoldingStart &&
        mouseOver !== startSq &&
        grid[mouseOver] !== END_SQ
      ) {
        nextGrid[startSq] = startIsCovering;
        setStartIsCovering(grid[mouseOver]);
        nextGrid[mouseOver] = START_SQ;
        setStartSq(mouseOver);
        if (isAnimatingFinished) {
          Animations.animate(algorithm, nextGrid, setGrid, 'none', false);
          return;
        }
      } else if (
        isHoldingEnd &&
        mouseOver !== endSq &&
        grid[mouseOver] !== START_SQ
      ) {
        nextGrid[endSq] = endIsCovering;
        setEndIsCovering(grid[mouseOver]);
        nextGrid[mouseOver] = END_SQ;
        setEndSq(mouseOver);
        if (isAnimatingFinished) {
          Animations.animate(algorithm, nextGrid, setGrid, 'none', false);
          return;
        }
      } else if (isWDown && mouseOver !== startSq && mouseOver !== endSq) {
        nextGrid[mouseOver] =
          grid[mouseOver] === WEIGHT_SQ ? DEFAULT_SQ : WEIGHT_SQ;
      } else if (mouseOver !== startSq && mouseOver !== endSq) {
        nextGrid[mouseOver] =
          grid[mouseOver] === WALL_SQ ? DEFAULT_SQ : WALL_SQ;
      }
      setGrid(nextGrid);
    }
  }, [isMouseDown, mouseOver]);

  const onMouseUp = (id) => {
    if (isHoldingStart) {
      setIsHoldingStart(false);
    } else if (isHoldingEnd) {
      setIsHoldingEnd(false);
    }
    setIsMouseDown(false);
  };

  const onMouseDown = (id) => {
    if (id === startSq) {
      setIsHoldingStart(true);
    } else if (id === endSq) {
      setIsHoldingEnd(true);
    }
    setIsMouseDown(true);
  };

  const onMouseOver = (id) => {
    setMouseOver(id);
  };

  const onKeyDown = (e) => {
    if (e.key === 'w') {
      setIsWDown(true);
    }
  };

  const onKeyUp = (e) => {
    if (e.key === 'w') {
      setIsWDown(false);
    }
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
  PATH_FINISHED_SQ,
  PATH_WEIGHT_SQ,
  PATH_FINISHED_WEIGHT_SQ,
  getRow,
  getCol,
  getCoor,
  getSq,
  dist,
  validMove,
  validMazeMove,
};
