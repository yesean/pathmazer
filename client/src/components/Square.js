import React from 'react';
import './../styles/Square.css';

const Square = (props) => {
  return (
    <div
      id={props.id}
      className={props.className}
      onMouseEnter={() => props.onMouseEnter(props.id)}
      onMouseDown={() => props.onMouseDown(props.id)}
      onMouseUp={() => props.onMouseUp(props.id)}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      tabIndex={-1}
    ></div>
  );
};

export default React.memo(Square);
