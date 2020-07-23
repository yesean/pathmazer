import React from 'react';
import ReactSelect from 'react-select';
import './../styles/TopBar.css';

const Select = (props) => {
  const customSelectStyle = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgb(17, 138, 178)',
      width: '160px',
      border: 'none',
      margin: '0px',
      padding: '0px',
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: '0px',
      borderRadius: '0px 0px 5px 5px',
    }),
    container: (provided, state) => ({
      ...provided,
      height: '40px',
      margin: 'auto 10px',
      display: 'flex',
      alignItems: 'center',
    }),
    control: (provided, state) => ({
      ...provided,
      width: '160px',
      height: '100%',
      border: 'none',
      borderRadius: state.menuIsOpen ? '5px 5px 0px 0px' : '5px',
      boxShadow: 'none',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 300,
      fontSize: '20px',
      cursor: 'pointer',
      userSelect: 'none',

      color: 'white',
      backgroundColor:
        state.hasValue || state.menuIsOpen
          ? 'rgb(17, 138, 178)'
          : 'transparent',
      '&:hover': {
        backgroundColor: 'rgb(17, 138, 178)',
        color: 'white',
        border: 'none',
      },
    }),
    dropdownIndicator: (provided, state) => ({
      margin: '3px',
    }),
    indicatorSeparator: (provided) => ({}),
    placeholder: (provided, state) => ({}),
    option: (provided, state) => ({
      ...provided,
      cursor: 'pointer',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 300,

      color: 'white',
      backgroundColor: 'rgb(17, 138, 178)',
      '&:hover': {
        color: 'rgb(38, 70, 83)',
        backgroundColor: 'rgb(233, 196, 106)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: '4px',
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      lineHeight: '36px',
      top: '50%',
      color: '',
    }),
    valueContainer: (provided) => ({
      ...provided,
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
      onChange={(data) => props.onChange(data.value)}
      placeholder={props.placeholder}
      isSearchable={false}
      tabSelectsValue={false}
    />
  );
};

export default Select;
