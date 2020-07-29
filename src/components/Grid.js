import React, { useState, useEffect, useCallback } from 'react';
import Square from './Square.js';
import Animations from './../services/Animations.js';
import GridConstants from './../services/GridConstants.js';
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
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHoldingStart, setIsHoldingStart] = useState(false);
  const [isHoldingEnd, setIsHoldingEnd] = useState(false);
  const [isWDown, setIsWDown] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(null);

  useEffect(() => {
    const updateGridOnMouseDown = (sq) => {
      if (!isAnimating && isMouseDown) {
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
      }
    };
    updateGridOnMouseDown(mouseIsOver);
  }, [isMouseDown, isAnimating]);

  useEffect(() => {
    const updateGridOnMouseEnter = (sq) => {
      const startSq = grid.findIndex((s) => s === GridConstants.START_SQ);
      const endSq = grid.findIndex((s) => s === GridConstants.END_SQ);
      if (!isAnimating && isMouseDown && (sq !== startSq) & (sq !== endSq)) {
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
    updateGridOnMouseEnter(mouseIsOver);
  }, [mouseIsOver, isAnimating]);

  const onMouseEnter = useCallback((sq) => {
    setMouseIsOver(sq);
  }, []);

  const onMouseDown = useCallback((sq) => {
    setIsMouseDown(true);
  }, []);

  const onMouseUp = useCallback((sq) => {
    setIsHoldingStart(false);
    setIsHoldingEnd(false);
    setIsMouseDown(false);
  }, []);

  const onKeyDown = useCallback((e) => {
    if (e.key === 'w') {
      setIsWDown(true);
    }
  }, []);

  const onKeyUp = useCallback((e) => {
    if (e.key === 'w') {
      setIsWDown(false);
    }
  }, []);

  const renderSquare = (sq) => {
    return (
      <Square
        id={sq}
        key={sq}
        className={grid[sq]}
        onMouseEnter={() => onMouseEnter(sq)}
        onMouseDown={() => onMouseDown(sq)}
        onMouseUp={() => onMouseUp(sq)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />
    );
  };

  const renderGrid = () => {
    return grid.map((sqType, sq) => renderSquare(sq));
  };

  return (
    <div style={gridStyle} className='grid'>
      {renderGrid()}
    </div>
  );
};

export default React.memo(Grid);
