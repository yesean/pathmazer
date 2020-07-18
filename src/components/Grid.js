import React, { useEffect } from 'react';
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
    endRow <= HEIGHT - 1 &&
    endCol >= 1 &&
    endCol < WIDTH - 1 &&
    validMove(start, end)
  );
};

let isHoldingStart = false;
let isHoldingEnd = false;
let isMouseDown = false;
let isWDown = false;
// let isWeight = new Array(SIZE).fill(false);

const Grid = ({
  grid,
  resetGrid,
  squareRefs,
  showPath,
  algorithm,
  lastSquare,
  setLastSquare,
}) => {
  // const [isWeight, setIsWeight] = useState(new Array(SIZE).fill(false));

  useEffect(() => {
    resetGrid();
  }, []);

  const renderSquare = (sq, id) => {
    if (id === 0) {
      console.log('rendering');
    }
    return (
      <Square
        key={id}
        id={id}
        className={sq}
        squareRefs={squareRefs}
        onMouseDown={() => onMouseDown(id)}
        onMouseUp={() => onMouseUp(id)}
        onMouseOver={() => onMouseOver(id)}
        onMouseOut={() => onMouseOut(id)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        // isWeight={isWeight[id]}
      />
    );
  };

  const renderGrid = () => {
    return grid.map((sq, ind) => renderSquare(sq, ind));
  };

  const updateBoard = (id) => {
    const elm = squareRefs[id].current;
    if (isHoldingStart) {
      setLastSquare(elm.className);
      elm.className = START_SQ;
      if (showPath) {
        Animations.animate(algorithm, squareRefs, false);
      }
    } else if (isHoldingEnd) {
      setLastSquare(elm.className);
      elm.className = END_SQ;
      if (showPath) {
        Animations.animate(algorithm, squareRefs, false);
      }
    } else if (elm.className === START_SQ) {
      isHoldingStart = true;
    } else if (elm.className === END_SQ) {
      isHoldingEnd = true;
    } else if (isWDown) {
      console.log('w is down');
      // elm.className = elm.className === WEIGHT_SQ ? DEFAULT_SQ : WEIGHT_SQ;
      if (elm.className === WEIGHT_SQ) {
        elm.className = DEFAULT_SQ;
        // isWeight[id] = false;
      } else {
        elm.className = WEIGHT_SQ;
        // isWeight[id] = true;
      }
    } else if (elm.className === WALL_SQ) {
      elm.className = DEFAULT_SQ;
    } else {
      elm.className = WALL_SQ;
    }
  };

  const onMouseUp = (id) => {
    if (isHoldingStart) {
      isHoldingStart = false;
    } else if (isHoldingEnd) {
      isHoldingEnd = false;
    }
    isMouseDown = false;
  };

  const onMouseDown = (id) => {
    updateBoard(id);
    isMouseDown = true;
  };

  const onMouseOver = (id) => {
    // for dragging
    if (isMouseDown) {
      updateBoard(id);
    }
  };

  const onMouseOut = (id) => {
    if (isMouseDown) {
      if (isHoldingStart || isHoldingEnd) {
        squareRefs[id].current.className = lastSquare;
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'w') {
      isWDown = true;
    }
  };

  const onKeyUp = (e) => {
    if (e.key === 'w') {
      isWDown = false;
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
