import React from 'react';
// import Grid from './Grid.js';
import './../styles/Square.css';
// import weight from './../images/kevin-malone.jpg';

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
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      tabIndex={-1}>
      {/* {props.isWeight && <img className='weightImg' src={weight} alt='KM' />} */}
    </div>
  );
};

// export default React.memo(Square);
export default Square;
