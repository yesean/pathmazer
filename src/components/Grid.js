import React, { useState } from 'react';
import './../styles/Grid.css';
import Square from './Square';
import GridConstants from './../GridConstants';

// let mouseDown = false;
// let holdingStart = false;
// let holdingEnd = false;

const Grid = (props) => {
  const [holdingStart, setHoldingStart] = useState(false);
  const [holdingEnd, setHoldingEnd] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastSquare, setLastSquare] = useState(GridConstants.DEFAULT_SQUARE);

  const renderSquare = (id) => {
    return (
      <Square
        key={id}
        id={id}
        className={props.grid[id]}
        onMouseDown={() => onMouseDown(id)}
        onMouseUp={() => onMouseUp(id)}
        onMouseOver={() => onMouseOver(id)}
        onMouseOut={() => onMouseOut(id)}
      />
    );
  };

  const updateBoard = (id) => {
    const elm = document.getElementById(id);
    if (holdingStart) {
      setLastSquare(elm.className);
      elm.className = GridConstants.START_SQUARE;
    } else if (holdingEnd) {
      setLastSquare(elm.className);
      elm.className = GridConstants.END_SQUARE;
    } else if (elm.className === GridConstants.START_SQUARE) {
      setHoldingStart(true);
    } else if (elm.className === GridConstants.END_SQUARE) {
      setHoldingEnd(true);
    } else if (elm.className !== GridConstants.WALL_SQUARE) {
      elm.className = GridConstants.WALL_SQUARE;
    } else {
      elm.className = GridConstants.DEFAULT_SQUARE;
    }
  };

  const onMouseUp = (id) => {
    if (holdingStart) {
      setHoldingStart(false);
      setLastSquare(GridConstants.DEFAULT_SQUARE);
    } else if (holdingEnd) {
      setHoldingEnd(false);
      setLastSquare(GridConstants.DEFAULT_SQUARE);
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
      const elm = document.getElementById(id);
      if (holdingStart) {
        elm.className = lastSquare;
      } else if (holdingEnd) {
        elm.className = lastSquare;
      }
    }
  };

  return (
    <ul className='grid'>
      {props.grid.map((square, index) => (
        <li className='squareContainer' key={index}>
          {renderSquare(index)}
        </li>
      ))}
    </ul>
  );
};

const areEqual = (prevProps, nextProps) => {
  for (let i = 0; i < nextProps.grid.length; i++) {
    if (prevProps.grid[i] !== nextProps.grid[i]) {
      console.log('rendering');
      return false;
    }
  }
  return true;
};

export default React.memo(Grid, areEqual);
