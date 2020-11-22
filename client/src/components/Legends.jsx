import React from 'react';
import Legend from './Legend.jsx';
import '../styles/App.css';

import weight from '../images/weight.svg';
import start from '../images/start.svg';
import end from '../images/end.svg';

const legends = [
  {
    name: 'Start',
    img: start,
  },
  {
    name: 'End',
    img: end,
  },
  {
    name: 'Weight',
    img: weight,
  },
  {
    name: 'Wall',
  },
  {
    name: 'Visited',
  },
  {
    name: 'Path',
  },
];

const Legends = () => {
  return (
    <div className="legendsContainer">
      {legends.map((legend) => (
        <Legend key={legend.name} name={legend.name} img={legend.img} />
      ))}
    </div>
  );
};

export default Legends;
