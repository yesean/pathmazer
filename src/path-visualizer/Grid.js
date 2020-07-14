import React, { useState, useEffect } from 'react';
import Square from './Square';
// import * as KeyListener from './KeyListener';
// import * as MouseListener from './MouseListener';

const width = 80;
const height = 40;
let mouseDown = false;
let mouseDownListener;
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
        onMouseDown={() => onMouseDown()}
        onMouseUp={() => onMouseUp()}
        onMouseOver={() => squareOnMouseOver(id)}
        onMouseOut={() => squareOnMouseOut(id)}
      />
    );
  };

  const onMouseUp = () => {
    console.log('mouse down set to false');
    mouseDown = false;
  };

  const onMouseDown = () => {
    console.log('mouse down set to true');
    mouseDown = true;
  };

  const mouseDownHandler = (id) => {
    console.log(`mouse over: mouse down over square ${id}`);
    if (sPressed) {
      const elm = document.getElementsByClassName('start')[0];
      if (elm !== undefined) {
        elm.className = 'square';
      }
      document.getElementById(id).className += ' start';
    } else if (ePressed) {
      const elm = document.getElementsByClassName('end')[0];
      if (elm !== undefined) {
        elm.className = 'square';
      }
      document.getElementById(id).className += ' end';
    } else {
      const elm = document.getElementById(id);
      if (!elm.className.includes('wall')) {
        elm.className += ' wall';
      } else {
        elm.className = 'square';
      }
    }
  };

  let squareOnMouseOver = (id) => {
    console.log(`adding mouse down event listener on square ${id}`);
    mouseDownListener = () => mouseDownHandler(id);
    document.addEventListener('mousedown', mouseDownListener);
  };

  const squareOnMouseOut = (id) => {
    console.log(`removing mouse down event listener on square ${id}`);
    document.removeEventListener('mousedown', mouseDownListener);
  };

  const dijkstra = () => {
    let start = document.getElementsByClassName('start')[0];
    let end = document.getElementsByClassName('end')[0];
    if (start !== undefined && end !== undefined) {
      start = Number(start.id);
      end = Number(end.id);
      const prev = {};
      const visited = [];
      const weights = new Array(width * height).fill(Number.MAX_SAFE_INTEGER);
      weights[start] = 1;
      const pq = [start];

      while (pq.length > 0) {
        console.log('running dijkstras');
        const currSquare = pq.shift();
        visited.push(currSquare);
        if (currSquare === end) {
          break;
        }
        const moves = [-1, 1, -width, width];
        for (const nextSquare of moves
          .map((move) => currSquare + move)
          .filter(
            (nextSquare) =>
              nextSquare > 0 &&
              nextSquare < width * height &&
              Math.abs((currSquare % width) - (nextSquare % width)) <= 1
          )) {
          let moveWeight = weights[currSquare];
          if (document.getElementById(nextSquare).className.includes('wall')) {
            moveWeight = Number.MAX_SAFE_INTEGER;
          } else {
            moveWeight += 1;
          }

          if (moveWeight < weights[nextSquare]) {
            weights[nextSquare] = moveWeight;
            prev[nextSquare] = currSquare;

            if (pq.includes(nextSquare)) {
              pq.splice(pq.indexOf(nextSquare), 1);
            }

            // insert into priority queue
            if (!visited.includes(nextSquare)) {
              let inserted = false;
              for (let i = 0; i < pq.length; i++) {
                if (moveWeight < weights[pq[i]]) {
                  pq.splice(i, 0, nextSquare);
                  inserted = true;
                  break;
                }
              }
              if (!inserted) {
                pq.push(nextSquare);
              }
            }
          }
        }
      }

      // retrace path
      let path = [];
      let currSquare = end;
      while (currSquare) {
        path.unshift(currSquare);
        currSquare = prev[currSquare];
      }

      animate(visited, path);
    }
  };

  const astar = () => {
    let start = document.getElementsByClassName('start')[0];
    let end = document.getElementsByClassName('end')[0];
    if (start !== undefined && end !== undefined) {
      start = Number(start.id);
      end = Number(end.id);
      const prev = {};
      const visited = [];
      const weights = new Array(width * height).fill(Number.MAX_SAFE_INTEGER);
      weights[start] = 1;
      const pq = [start];

      const heuristic = (start, end) => {
        return (
          Math.abs(Math.floor(start / width) - Math.floor(end / width)) +
          Math.abs((start % width) - (end % width))
        );
      };

      while (pq.length > 0) {
        console.log('running astar');
        const currSquare = pq.shift();
        visited.push(currSquare);
        if (currSquare === end) {
          break;
        }
        const moves = [-1, 1, -width, width];
        for (const nextSquare of moves
          .map((move) => currSquare + move)
          .filter(
            (nextSquare) =>
              nextSquare > 0 &&
              nextSquare < width * height &&
              Math.abs((currSquare % width) - (nextSquare % width)) <= 1
          )) {
          let moveWeight = weights[currSquare];
          if (document.getElementById(nextSquare).className.includes('wall')) {
            moveWeight = Number.MAX_SAFE_INTEGER;
          } else {
            moveWeight += 1;
          }

          if (moveWeight < weights[nextSquare]) {
            weights[nextSquare] = moveWeight;
            prev[nextSquare] = currSquare;

            if (pq.includes(nextSquare)) {
              pq.splice(pq.indexOf(nextSquare), 1);
            }

            // insert into priority queue
            if (!visited.includes(nextSquare)) {
              let inserted = false;
              for (let i = 0; i < pq.length; i++) {
                if (
                  moveWeight + heuristic(nextSquare, end) <
                  weights[pq[i]] + heuristic(pq[i], end)
                ) {
                  pq.splice(i, 0, nextSquare);
                  inserted = true;
                  break;
                }
              }
              if (!inserted) {
                pq.push(nextSquare);
              }
            }
          }
        }
      }

      // retrace path
      let path = [];
      let currSquare = end;
      while (currSquare) {
        path.unshift(currSquare);
        currSquare = prev[currSquare];
      }

      animate(visited, path);
    }
  };

  const animate = (visited, path) => {
    const start = Number(document.getElementsByClassName('start')[0].id);
    const end = Number(document.getElementsByClassName('end')[0].id);
    let tick = 0;

    // animate dijkstra
    for (const square of visited) {
      setTimeout(() => {
        if (square !== start && square !== end) {
          document.getElementById(square).className += ' visited';
        }
      }, tick++ * 15);
    }

    // animate path
    for (const square of path) {
      setTimeout(() => {
        if (square !== start && square !== end) {
          document.getElementById(square).className += ' path';
        }
      }, (tick++ + 5) * 15);
    }
  };

  const reset = () => {
    grid.forEach((square, index) => {
      document.getElementById(index).className = 'square';
    });
  };

  return (
    <div className='page'>
      <div className='grid'>
        {grid.map((square, index) => renderSquare(index))}
      </div>
      <div className='buttons'>
        <button className='run' onClick={() => dijkstra()}>
          dijkstra
        </button>
        <button className='run' onClick={() => astar()}>
          astar
        </button>
        <button className='run' onClick={() => reset()}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Grid;
