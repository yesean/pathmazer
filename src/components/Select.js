import React from 'react';
import ReactSelect from 'react-select';
import './../styles/TopBar.css';

const Select = (props) => {
  const customSelectStyle = {
    menu: (provided, state) => ({
      ...provided,
      // backgroundColor: 'rgb(244, 162, 97)',
      backgroundColor: 'rgb(17, 138, 178)',
      border: 'none',
      width: '160px',
      margin: '0px',
      borderRadius: '0px 0px 5px 5px',
    }),
    container: (provided, state) => ({
      ...provided,
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      margin: 'auto 5px auto 20px',
    }),
    control: (provided, state) => ({
      ...provided,
      // color: state.hasValue || state.menuIsOpen ? 'rgb(38, 70, 83)' : 'white',
      color: 'white',
      backgroundColor:
        state.hasValue || state.menuIsOpen
          ? // ? 'rgb(244, 162, 97)'
            'rgb(17, 138, 178)'
          : 'transparent',
      '&:hover': {
        // backgroundColor: 'rgb(244, 162, 97)',
        // color: 'rgb(38, 70, 83)',
        backgroundColor: 'rgb(17, 138, 178)',
        color: 'white',
        border: 'none',
      },
      height: '100%',
      userSelect: 'none',
      border: 'none',
      boxShadow: 'none',
      cursor: 'pointer',
      width: '160px',
      borderRadius: state.menuIsOpen ? '5px 5px 0px 0px' : '5px',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 300,
      fontSize: '20px',
    }),
    dropdownIndicator: (provided, state) => ({}),
    indicatorSeparator: (provided) => ({}),
    placeholder: (provided, state) => ({}),
    option: (provided, state) => ({
      ...provided,
      // color: 'rgb(38, 70, 83)',
      // backgroundColor: 'rgb(244, 162, 97)',
      color: 'white',
      backgroundColor: 'rgb(17, 138, 178)',
      '&:hover': {
        // color: 'white',
        // backgroundColor: 'rgb(42, 157, 143)',
        color: 'rgb(38, 70, 83)',
        backgroundColor: 'rgb(233, 196, 106)',
      },
      cursor: 'pointer',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 300,
    }),
    singleValue: (provided) => ({
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: '4px',
      boxSizing: 'border-box',
      maxWidth: '100%',
      width: '100%',
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100%',
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
