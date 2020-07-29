import React from 'react';
import GridConstants from './../services/GridConstants.js';
import './../styles/Square.css';

import weight from './../images/weight.png';
import start from './../images/start.png';
import end from './../images/end.png';

const Square = (props) => {
  console.log('rendering');
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
      {(props.className === GridConstants.WEIGHT_SQ ||
        props.className === GridConstants.VISITED_WEIGHT_SQ ||
        props.className === GridConstants.VISITED_FINISHED_WEIGHT_SQ ||
        props.className === GridConstants.PATH_WEIGHT_SQ ||
        props.className === GridConstants.PATH_FINISHED_WEIGHT_SQ) && (
        <img
          src={weight}
          className='weightImg'
          draggable='false'
          alt='weight'
        />
      )}
      {(props.className === GridConstants.START_SQ ||
        props.className === GridConstants.PATH_HEAD_SQ) && (
        <img src={start} className='startImg' draggable='false' alt='start' />
      )}
      {props.className === GridConstants.END_SQ && (
        <img src={end} className='endImg' draggable='false' alt='end' />
      )}
    </div>
  );
};

const areEqual = (prev, next) => {
  if (prev.className !== next.className)
    console.log(prev.className, next.className);
  return prev.className === next.className;
};

export default React.memo(Square, areEqual);
// export default React.memo(Square);
