import React, { useState, useEffect } from 'react';
import Square from './Square';
import { animate } from './Animate';
import { dijkstra, astar } from './Algorithms';
import { generateMaze } from './Maze';

const width = 80;
const height = 40;
let mouseDown = false;
let sPressed = false;
let ePressed = false;
const Grid = () => {
  const [grid] = useState(new Array(width * height).fill(0));

  useEffect(() => {
    document.onkeydown = ({ key }) => {
      if (key === 's') {
        sPressed = true;
      } else if (key === 'e') {
        ePressed = true;
      }
    };
    document.onkeyup = ({ key }) => {
      if (key === 's') {
        sPressed = false;
      } else if (key === 'e') {
        ePressed = false;
      }
    };
    return () => {};
  }, []);

  const renderSquare = (id) => {
    console.log('rendering');

    return (
      <Square
        key={id}
        id={id}
        color={grid[id].color}
        onMouseDown={() => onMouseDown(id)}
        onMouseUp={() => onMouseUp()}
        onMouseOver={() => onMouseOver(id)}
      />
    );
  };

  const updateBoard = (id) => {
    if (sPressed) {
      const oldElm = document.getElementsByClassName('start')[0];
      const targetElm = document.getElementById(id);
      if (!targetElm.className.includes('wall')) {
        if (oldElm !== undefined) {
          oldElm.className = 'square';
        }
        targetElm.className += ' start';
      }
    } else if (ePressed) {
      const oldElm = document.getElementsByClassName('end')[0];
      const targetElm = document.getElementById(id);
      if (!targetElm.className.includes('wall')) {
        if (oldElm !== undefined) {
          oldElm.className = 'square';
        }
        targetElm.className += ' end';
      }
    } else {
      const elm = document.getElementById(id);
      if (!elm.className.includes('wall')) {
        elm.className += ' wall';
      } else {
        elm.className = 'square';
      }
    }
  };

  const onMouseUp = () => {
    mouseDown = false;
  };

  const onMouseDown = (id) => {
    mouseDown = true;
    updateBoard(id);
  };

  const onMouseOver = (id) => {
    // for dragging
    if (mouseDown) {
      updateBoard(id);
    }
  };

  const reset = () => {
    grid.forEach((square, index) => {
      document.getElementById(index).className = 'square';
    });
  };

  const onDijkstra = () => {
    const [v, p] = dijkstra();
    animate(v, p);
  };

  const onAstar = () => {
    const [v, p] = astar();
    animate(v, p);
  };

  return (
    <div className='page'>
      <div className='grid'>
        {grid.map((square, index) => renderSquare(index))}
      </div>
      <div className='buttons'>
        <button className='maze' onClick={() => generateMaze(grid)}>
          maze
        </button>
        <button className='dijkstra' onClick={onDijkstra}>
          dijkstra
        </button>
        <button className='astar' onClick={onAstar}>
          astar
        </button>
        <button className='reset' onClick={() => reset()}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Grid;
