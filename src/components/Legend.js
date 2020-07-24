import React from 'react';
import './../styles/Legend.css';

const Legend = ({ name, img }) => {
  return (
    <span className='legendContainer'>
      <span className={`legend ${name}Legend`}>
        {img && (
          <img className='legendImg' src={img} alt={img} draggable='false' />
        )}
      </span>
      <span className='legendText'>{name}</span>
    </span>
  );
};

export default Legend;
