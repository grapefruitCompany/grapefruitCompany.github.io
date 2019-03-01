import React from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';
// import { colourOptions } from '../data';

import './style.scss';
import '../../Styles/main.scss';
// import { Link } from "react-router-dom";

//Добавить возможность сортировки и поиска по:
//материалу
//периоду
//автору
//цвету
//типу

// const colourOptions = ['red', 'yellow', 'green'];

const colourOptions = [
  { value: '#6600cc', label: '#6600cc', color: '#6600cc' },
  { value: '#660033', label: '#660033', color: '#660033' },
  { value: '#996633', label: '#996633', color: '#996633' },
  { value: '#003300', label: '#003300', color: '#003300' },
  { value: '#339966', label: '#339966', color: '#339966' },
  { value: '#0000ff', label: '#0000ff', color: '#0000ff' }
];

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected ? data.color : isFocused ? color.alpha(0.5).css() : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: 'data.color',
      color: 'white',
    },
  }),
};

class ReactSelect extends React.Component {
  render() {
    return(
      <Select
        closeMenuOnSelect={false}
        placeholder='Select Color'
        isMulti
        classNamePrefix="react-select"
        options={colourOptions}
        styles={colourStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
          ...theme.colors,
            neutral20: '#A0A0A0',
            primary25: '#A0A0A0',
            primary: '#9c1da3',
          },
        })}
      />
    )
  }
}

export default ReactSelect;