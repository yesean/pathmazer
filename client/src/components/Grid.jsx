import React, { useState, useEffect, useCallback } from 'react';
import Square from './Square.jsx';
import Animations from '../services/Animations.js';
import GridConstants from '../services/GridConstants.js';
import './../styles/Grid.css';

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
  isTutorialShowing,
}) => {
  const [mouseIsDownOn, setMouseIsDownOn] = useState(null);
  const [isHoldingStart, setIsHoldingStart] = useState(false);
  const [isHoldingEnd, setIsHoldingEnd] = useState(false);
  const [isWDown, setIsWDown] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(null);

  useEffect(() => {
    grid.forEach((sq) => {
      if (sq.ref) {
        sq.ref.current.className = sq.initialClassName;
      }
    });
  }, [grid]);

  useEffect(() => {
    // wait until refs are populated
    if (grid.some((sq) => !sq.ref)) return;

    const updateGridOnMouseEnter = (sq) => {
      if (!isAnimating && mouseIsDownOn !== null) {
        const startSq = grid.findIndex(
          (s) => s.ref.current.className === GridConstants.START_SQ
        );
        const endSq = grid.findIndex(
          (s) => s.ref.current.className === GridConstants.END_SQ
        );
        if (sq !== startSq && sq !== endSq) {
          if (isHoldingStart) {
            if (grid[sq].ref.current.className !== GridConstants.START_SQ) {
              setStartIsCovering(grid[sq].ref.current.className);
            }
            grid[startSq].ref.current.className = startIsCovering;
            grid[sq].ref.current.className = GridConstants.START_SQ;
            if (isAnimatingFinished) {
              Animations.animate(algorithm, grid, 'none');
              return;
            }
          } else if (isHoldingEnd) {
            if (grid[sq].ref.current.className !== GridConstants.END_SQ) {
              setEndIsCovering(grid[sq].ref.current.className);
            }
            grid[endSq].ref.current.className = endIsCovering;
            grid[sq].ref.current.className = GridConstants.END_SQ;
            if (isAnimatingFinished) {
              Animations.animate(algorithm, grid, 'none');
              return;
            }
          } else if (
            grid[sq].ref.current.className === GridConstants.WEIGHT_SQ
          ) {
            if (isWDown) {
              grid[sq].ref.current.className = GridConstants.DEFAULT_SQ;
            } else {
              grid[sq].className = GridConstants.WALL_SQ;
            }
          } else if (grid[sq].ref.current.className === GridConstants.WALL_SQ) {
            if (isWDown) {
              grid[sq].ref.current.className = GridConstants.WEIGHT_SQ;
            } else {
              grid[sq].ref.current.className = GridConstants.DEFAULT_SQ;
            }
          } else {
            if (isWDown) {
              grid[sq].ref.current.className = GridConstants.WEIGHT_SQ;
            } else {
              grid[sq].ref.current.className = GridConstants.WALL_SQ;
            }
          }
        }
      }
    };
    updateGridOnMouseEnter(mouseIsOver);
  }, [
    algorithm,
    endIsCovering,
    grid,
    isAnimating,
    isAnimatingFinished,
    isHoldingEnd,
    isHoldingStart,
    isWDown,
    mouseIsDownOn,
    mouseIsOver,
    setEndIsCovering,
    setGrid,
    setStartIsCovering,
    startIsCovering,
  ]);

  useEffect(() => {
    if (grid.some((sq) => !sq.ref)) return;

    if (
      grid[mouseIsDownOn] &&
      grid[mouseIsDownOn].ref.current.className === GridConstants.START_SQ
    ) {
      setIsHoldingStart(true);
    } else if (
      grid[mouseIsDownOn] &&
      grid[mouseIsDownOn].ref.current.className === GridConstants.END_SQ
    ) {
      setIsHoldingEnd(true);
    }
  }, [mouseIsDownOn, grid, setIsHoldingStart, setIsHoldingEnd]);

  const onMouseEnter = useCallback(
    (sq) => {
      if (!isTutorialShowing) {
        setMouseIsOver(sq);
      }
    },
    [isTutorialShowing]
  );

  const onMouseDown = useCallback(
    (sq) => {
      if (!isTutorialShowing) {
        setMouseIsOver(sq);
        setMouseIsDownOn(sq);
      }
    },
    [isTutorialShowing]
  );

  const onMouseUp = useCallback(
    (sq) => {
      if (!isTutorialShowing) {
        setIsHoldingStart(false);
        setIsHoldingEnd(false);
        setMouseIsDownOn(null);
      }
    },
    [isTutorialShowing]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'w' && !isTutorialShowing) {
        setIsWDown(true);
      }
    },
    [isTutorialShowing]
  );

  const onKeyUp = useCallback(
    (e) => {
      if (e.key === 'w' && !isTutorialShowing) {
        setIsWDown(false);
      }
    },
    [isTutorialShowing]
  );

  return (
    <div style={gridStyle} className="grid">
      {grid.map((sqType, sq) => (
        <Square
          key={sq}
          setGrid={setGrid}
          id={sq}
          className={grid[sq].initialClassName}
          onMouseEnter={onMouseEnter}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
      ))}
    </div>
  );
};

export default Grid;
