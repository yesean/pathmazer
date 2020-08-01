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
  isTutorialShowing,
}) => {
  const [mouseIsDownOn, setMouseIsDownOn] = useState(null);
  const [isHoldingStart, setIsHoldingStart] = useState(false);
  const [isHoldingEnd, setIsHoldingEnd] = useState(false);
  const [isWDown, setIsWDown] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(null);

  useEffect(() => {
    const updateGridOnMouseEnter = (sq) => {
      if (!isAnimating && mouseIsDownOn !== null) {
        setGrid((oldGrid) => {
          const nextGrid = [...oldGrid];
          const startSq = oldGrid.findIndex(
            (s) => s === GridConstants.START_SQ
          );
          const endSq = oldGrid.findIndex((s) => s === GridConstants.END_SQ);
          if (sq !== startSq && sq !== endSq) {
            if (isHoldingStart) {
              document.getElementById(startSq).className = startIsCovering;
              document.getElementById(sq).className = GridConstants.START_SQ;
              nextGrid[startSq] = startIsCovering;
              nextGrid[sq] = GridConstants.START_SQ;
              if (oldGrid[sq] !== GridConstants.START_SQ) {
                setStartIsCovering(oldGrid[sq]);
              }
              if (isAnimatingFinished) {
                Animations.animate(algorithm, nextGrid, setGrid, 'none');
                return;
              }
            } else if (isHoldingEnd) {
              document.getElementById(endSq).className = endIsCovering;
              document.getElementById(sq).className = GridConstants.END_SQ;
              nextGrid[endSq] = endIsCovering;
              nextGrid[sq] = GridConstants.END_SQ;
              if (oldGrid[sq] !== GridConstants.END_SQ) {
                setEndIsCovering(oldGrid[sq]);
              }
              if (isAnimatingFinished) {
                Animations.animate(algorithm, nextGrid, setGrid, 'none');
                return;
              }
            } else if (oldGrid[sq] === GridConstants.WEIGHT_SQ) {
              if (isWDown) {
                document.getElementById(sq).className =
                  GridConstants.DEFAULT_SQ;
                nextGrid[sq] = GridConstants.DEFAULT_SQ;
              } else {
                document.getElementById(sq).className = GridConstants.WALL_SQ;
                nextGrid[sq] = GridConstants.WALL_SQ;
              }
            } else if (oldGrid[sq] === GridConstants.WALL_SQ) {
              if (isWDown) {
                document.getElementById(sq).className = GridConstants.WEIGHT_SQ;
                nextGrid[sq] = GridConstants.WEIGHT_SQ;
              } else {
                document.getElementById(sq).className =
                  GridConstants.DEFAULT_SQ;
                nextGrid[sq] = GridConstants.DEFAULT_SQ;
              }
            } else {
              if (isWDown) {
                document.getElementById(sq).className = GridConstants.WEIGHT_SQ;
                nextGrid[sq] = GridConstants.WEIGHT_SQ;
              } else {
                document.getElementById(sq).className = GridConstants.WALL_SQ;
                nextGrid[sq] = GridConstants.WALL_SQ;
              }
            }
          }
          return nextGrid;
        });
      }
    };
    updateGridOnMouseEnter(mouseIsOver);
  }, [
    mouseIsOver,
    mouseIsDownOn,
    isWDown,
    isHoldingStart,
    isHoldingEnd,
    isAnimating,
    isAnimatingFinished,
    algorithm,
    startIsCovering,
    endIsCovering,
    setGrid,
    setMouseIsOver,
    setStartIsCovering,
    setEndIsCovering,
  ]);

  useEffect(() => {
    if (grid[mouseIsDownOn] === GridConstants.START_SQ) {
      setIsHoldingStart(true);
    } else if (grid[mouseIsDownOn] === GridConstants.END_SQ) {
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

  const renderSquare = (sq) => {
    return (
      <Square
        id={sq}
        key={sq}
        className={grid[sq]}
        onMouseEnter={onMouseEnter}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
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
