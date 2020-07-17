import React, { useState, useEffect, useMemo } from 'react';
import './../styles/Grid.css';
import Square from './Square.js';
import Animations from './../services/Animations.js';

const WIDTH = 90;
const HEIGHT = 45;
const SIZE = WIDTH * HEIGHT;
const INITIAL_START = 20 * WIDTH + 20;
const INITIAL_END = 20 * WIDTH + 70;
const DEFAULT_SQ = 'square';
const START_SQ = 'startSquare';
const END_SQ = 'endSquare';
const WALL_SQ = 'wallSquare';
const VISITED_SQ = 'visitedSquare';
const PATH_SQ = 'pathSquare';
const VISITED_FINISHED_SQ = 'visitedFinishedSquare';
const PATH_FINISHED_SQ = 'pathFinishedSquare';
const VISITED_HEAD_SQ = 'visitedHeadSquare';
const dist = (start, end) =>
  Math.abs(Math.floor(start / WIDTH) - Math.floor(end / WIDTH)) +
  Math.abs((start % WIDTH) - (end % WIDTH));
const validMove = (start, end) => {
  return (
    end < Grid.WIDTH * Grid.HEIGHT &&
    end >= 0 &&
    Math.abs(Math.floor(start % WIDTH) - Math.floor(end % WIDTH)) <= 2
  );
};

const Grid = ({
  grid,
  resetGrid,
  squareRefs,
  showPath,
  algorithm,
  lastSquare,
  setLastSquare,
}) => {
  let holdingStart = false;
  let holdingEnd = false;
  let mouseDown = false;

  useEffect(() => {
    resetGrid();
  }, []);

  const renderSquare = (sq, id) => {
    console.log('rendering');
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
      />
    );
  };

  const renderGrid = () => {
    return grid.map((sq, ind) => renderSquare(sq, ind));
  };

  const updateBoard = (id) => {
    if (holdingStart) {
      setLastSquare(squareRefs[id].current.className);
      squareRefs[id].current.className = START_SQ;
      if (showPath) {
        Animations.animate(algorithm, squareRefs, false);
      }
    } else if (holdingEnd) {
      setLastSquare(squareRefs[id].current.className);
      squareRefs[id].current.className = END_SQ;
      if (showPath) {
        Animations.animate(algorithm, squareRefs, false);
      }
    } else if (squareRefs[id].current.className === START_SQ) {
      holdingStart = true;
    } else if (squareRefs[id].current.className === END_SQ) {
      holdingEnd = true;
    } else if (squareRefs[id].current.className === WALL_SQ) {
      squareRefs[id].current.className = DEFAULT_SQ;
    } else {
      setLastSquare(squareRefs[id].current.className);
      squareRefs[id].current.className = WALL_SQ;
    }
  };

  const onMouseUp = (id) => {
    console.log('mouse up')
    if (holdingStart) {
      holdingStart = false;
    } else if (holdingEnd) {
      holdingEnd = false;
    }
    mouseDown = false;
  };

  const onMouseDown = (id) => {
    updateBoard(id);
    // setMouseDown(true);
    mouseDown = true;
  };

  const onMouseOver = (id) => {
    // for dragging
    if (mouseDown) {
      updateBoard(id);
    }
  };

  const onMouseOut = (id) => {
    if (mouseDown) {
      if (holdingStart || holdingEnd) {
        // console.log('restoring ', lastSquare);
        squareRefs[id].current.className = lastSquare;
      }
    }
  };

  return (
    // <ul className='grid'>
    //   {grid.map((sq, ind) => (
    //     <li className='squareContainer' key={ind}>
    //       {renderSquare(sq, ind)}
    //     </li>
    //   ))}
    // </ul>
    <div className='grid'>{renderGrid()}</div>
  );
};

// export default Grid;
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
  VISITED_SQ,
  PATH_SQ,
  VISITED_FINISHED_SQ,
  PATH_FINISHED_SQ,
  VISITED_HEAD_SQ,
  dist,
  validMove,
};
