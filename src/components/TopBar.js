import React, { useState } from 'react';
import Select, { NonceProvider } from 'react-select';
import './../styles/TopBar.css';
import Animations from './../services/Animations.js';
import Maze from './../services/Maze.js';
import { dijkstra } from '../services/Algorithms';

const TopBar = (props) => {
  const handleChange = (event) => {
    props.setAlgorithm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Animations.animate(props.algorithm, props.squareRefs, true)) {
      props.setFinished(true);
    }
  };

  // const algorithms = [
  //   { value: 'dijkstra', label: 'Dijkstra' },
  //   { value: 'astar', label: 'A* Search' },
  // ];

  const algorithmMap = {
    dijkstra: 'Dijkstra',
    astar: 'A* Search',
  };

  const algorithms = ['dijkstra', 'astar'];

  const customSelectStyle = {
    menu: (provided, state) => ({
      ...provided,
      // backgroundColor: '#2657c9',
      backgroundColor: 'black',
      margin: 'none',
      border: 'none',
    }),
    control: (provided, state) => ({
      ...provided,
      'color': state.hasValue || state.menuIsOpen ? '#36e379' : 'white',
      'backgroundColor':
        state.hasValue || state.menuIsOpen ? 'black' : '#2657c9',
      '&:hover': {
        color: '#36e379',
        backgroundColor: 'black',
      },
      'margin': '10px',
      'border': 'none',
      'boxShadow': 'none',
      'cursor': 'pointer',
      'width': 165,
    }),
    dropdownIndicator: (provided, state) => ({
      margin: '5px',
    }),
    indicatorSeparator: (provided) => ({
      display: 'none',
    }),
    placeholder: (provided, state) => ({}),
    option: (provided, state) => ({
      ...provided,
      'color': 'white',
      'backgroundColor': 'black',
      '&:hover': {
        color: '#36e379',
      },
      'cursor': 'pointer',
    }),
    singleValue: (provided) => ({
      color: '#36e379',
    }),
  };

  return (
    <div className='topBarContainer'>
      <ul className='topBar'>
        <li>
          <form className='algorithmForm' onSubmit={handleSubmit}>
            <Select
              className='algorithmSelect'
              styles={customSelectStyle}
              options={algorithms.map((alg) => ({
                value: alg,
                label: algorithmMap[alg],
              }))}
              value={
                props.algorithm && {
                  value: props.algorithm,
                  label: algorithmMap[props.algorithm],
                }
              }
              onChange={(data) => {
                props.setAlgorithm(data.value);
                console.log('alg ', props.algorithm);
              }}
              placeholder='Select Algorithm'
              isSearchable={false}
              tabSelectsValue={false}
            />
            <input
              className='visualizeButton'
              type='submit'
              value='Visualize'
            />
          </form>
        </li>
        <li className='mazeButtonContainer'>
          <button
            className='mazeButton'
            onClick={() => Maze.generateMaze(props.squareRefs, props.resetGrid)}
          >
            Generate Maze
          </button>
        </li>
        <li className='resetButtonContainer'>
          <button className='resetButton' onClick={props.resetGrid}>
            Reset
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
