import React from 'react';

const Square = (props) => {
  return (
    <div
      id={props.id}
      className='square'
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    ></div>
  );
};

export default Square;
