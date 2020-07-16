import React from 'react';
import './../styles/Square.css';

const Square = (props) => {
  props.squareRefs[props.id] = React.useRef(null);

  return (
    <div
      id={props.id}
      className={props.className}
      ref={props.squareRefs[props.id]}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    ></div>
  );
};

export default React.memo(Square);
