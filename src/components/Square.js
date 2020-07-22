import React from 'react';
// import Grid from './Grid.js';
import './../styles/Square.css';
import weight from './../images/weight.svg';
import Grid from './Grid';

const Square = (props) => {
  return (
    <div
      id={props.id}
      className={props.className}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseOver={props.onMouseOver}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      tabIndex={-1}>
      {(props.className === Grid.WEIGHT_SQ ||
        props.className === Grid.VISITED_WEIGHT_SQ ||
        props.className === Grid.VISITED_FINISHED_WEIGHT_SQ ||
        props.className === Grid.PATH_WEIGHT_SQ ||
        props.className === Grid.PATH_FINISHED_WEIGHT_SQ) && (
        <img
          src={weight}
          className='weightImg'
          draggable='false'
          alt='weight'
        />
      )}
    </div>
  );
};

const areEqual = (old, next) => {
  return old.className === next.className;
};

export default React.memo(Square, areEqual);
