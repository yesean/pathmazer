import React, { useState } from 'react';
import './../styles/Grid.css';
import Square from './Square.js';
import GridConstants from './../services/GridConstants.js';
import Animations from './../services/Animations.js';

const Grid = ({
  grid,
  setGrid,
  squareRefs,
  finished,
  algorithm,
  lastSquare,
  setLastSquare,
}) => {
  const [holdingStart, setHoldingStart] = useState(false);
  const [holdingEnd, setHoldingEnd] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const renderSquare = (id) => {
    return (
      <Square
        key={id}
        id={id}
        className={grid[id]}
        squareRefs={squareRefs}
        onMouseDown={() => onMouseDown(id)}
        onMouseUp={() => onMouseUp(id)}
        onMouseOver={() => onMouseOver(id)}
        onMouseOut={() => onMouseOut(id)}
      />
    );
  };

  const updateBoard = (id) => {
    if (holdingStart) {
      setLastSquare(squareRefs[id].current.className);
      squareRefs[id].current.className = GridConstants.START_SQUARE;
      if (finished) {
        Animations.animate(algorithm, squareRefs, false);
      }
    } else if (holdingEnd) {
      setLastSquare(squareRefs[id].current.className);
      squareRefs[id].current.className = GridConstants.END_SQUARE;
      if (finished) {
        Animations.animate(algorithm, squareRefs, false);
      }
    } else if (
      squareRefs[id].current.className === GridConstants.START_SQUARE
    ) {
      setHoldingStart(true);
    } else if (squareRefs[id].current.className === GridConstants.END_SQUARE) {
      setHoldingEnd(true);
    } else if (squareRefs[id].current.className === GridConstants.WALL_SQUARE) {
      squareRefs[id].current.className = GridConstants.DEFAULT_SQUARE;
    } else {
      squareRefs[id].current.className = GridConstants.WALL_SQUARE;
    }
  };

  const onMouseUp = (id) => {
    if (holdingStart) {
      setHoldingStart(false);
    } else if (holdingEnd) {
      setHoldingEnd(false);
    }
    setMouseDown(false);
  };

  const onMouseDown = (id) => {
    updateBoard(id);
    setMouseDown(true);
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
        squareRefs[id].current.className = lastSquare;
      }
    }
  };

  return (
    <ul className='grid'>
      {grid.map((square, index) => (
        <li className='squareContainer' key={index}>
          {renderSquare(index)}
        </li>
      ))}
    </ul>
  );
};

export default Grid;
