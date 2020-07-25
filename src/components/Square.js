import React from 'react';
// import Grid from './Grid.js';
import './../styles/Square.css';
import weight from './../images/weight.svg';
import start from './../images/start.svg';
import end from './../images/end.svg';
import Grid from './Grid';

const Square = (props) => {
  return (
    <div
      id={props.id}
      className={props.className}
      onMouseEnter={props.onMouseEnter}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
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
      {(props.className === Grid.START_SQ ||
        props.className === Grid.PATH_HEAD_SQ) && (
        <img src={start} className='startImg' draggable='false' alt='start' />
      )}
      {props.className === Grid.END_SQ && (
        <img src={end} className='endImg' draggable='false' alt='end' />
      )}
    </div>
  );
};

export default React.memo(Square);
