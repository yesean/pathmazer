import React, { useEffect, useRef } from 'react';
import './../styles/Square.css';

const Square = ({ setGrid, id, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    setGrid((grid) => {
      const nextGrid = [...grid];
      nextGrid[id].ref = ref;
      return nextGrid;
    });

    return () => {
      ref.current = null;
    };
  }, [setGrid, id]);

  return (
    <div
      ref={ref}
      id={id}
      className={props.className}
      onMouseEnter={() => props.onMouseEnter(id)}
      onMouseDown={() => props.onMouseDown(id)}
      onMouseUp={() => props.onMouseUp(id)}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      tabIndex={-1}
    ></div>
  );
};

export default React.memo(Square);
