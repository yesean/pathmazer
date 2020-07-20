import React from 'react';
import ReactSelect from 'react-select';
import './../styles/TopBar.css';

const Select = (props) => {
  const customSelectStyle = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: 'black',
      border: 'none',
      width: '160px',
      margin: '0px',
      borderRadius: '0px 0px 5px 5px',
    }),
    container: (provided, state) => ({
      ...provided,
      height: '40px',
      margin: '0px 10px',
      display: 'flex',
      alignItems: 'center',
    }),
    control: (provided, state) => ({
      ...provided,
      color: state.hasValue || state.menuIsOpen ? '#36e379' : 'white',
      backgroundColor:
        state.hasValue || state.menuIsOpen
          ? 'rgb(233, 196, 106)'
          : 'transparent',
      '&:hover': {
        color: '#36e379',
        backgroundColor: 'black',
        border: 'none',
      },
      height: '100%',
      userSelect: 'none',
      border: state.hasValue || state.menuIsOpen ? 'none' : '2px solid black',
      boxShadow: 'none',
      cursor: 'pointer',
      width: '160px',
      borderRadius: state.menuIsOpen ? '5px 5px 0px 0px' : '5px',
      fontWeight: 300,
      fontFamily: 'Roboto, sans-serif',
    }),
    dropdownIndicator: (provided, state) => ({}),
    indicatorSeparator: (provided) => ({}),
    placeholder: (provided, state) => ({}),
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      backgroundColor: 'black',
      '&:hover': {
        color: '#36e379',
        backgroundColor: 'black',
      },
      cursor: 'pointer',
    }),
    // singleValue: (provided) => ({
    //   // ...provided,
    //   // margin: 'auto',
    // }),
    singleValue: (provided) => {
      delete provided['color'];
      provided = {
        ...provided,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingRight: '4px',
        boxSizing: 'border-box',
      };
      return provided;
    },
    valueContainer: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'flexEnd',
    }),
  };

  return (
    <ReactSelect
      styles={customSelectStyle}
      options={props.options.map((option) => ({
        value: option,
        label: props.optionsMap[option],
      }))}
      value={
        props.option && {
          value: props.option,
          label: props.optionsMap[props.option],
        }
      }
      onChange={(data) => props.setOption(data.value)}
      placeholder={props.placeholder}
      isSearchable={false}
      tabSelectsValue={false}
    />
  );
};

export default Select;
