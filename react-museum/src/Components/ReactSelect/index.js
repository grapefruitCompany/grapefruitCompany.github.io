import React from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';

import './style.scss';
import '../../Styles/main.scss';


class ReactSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: ''
    }
  }

  handleChange = (value: any) => {
    this.props.filterByColor(value.value);
    this.setState({
      currentValue: value.value
    });
  };

  render() {
    console.log(this.state);
    let defaultValue = this.state.currentValue;
    const colourOptions = [];
    if (this.props.colors.length) {
      let colors = this.props.colors;
      for (let i = 0; i < colors.length; i++) {
        let color = colors[i].key.match(/#\w*/g)[0];
        let obj = {
          value: color,
          label: color,
          color: color
        }
        colourOptions.push(obj);
      }

      if (this.props.filter.value.length) {
        for (let i = 0; i < colourOptions.length; i++) {
          if (this.props.filter.value === colourOptions[i].value) {
            defaultValue = colourOptions[i];
          }
        }
      }
    }

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
    return(
      <Select
        value={ defaultValue }
        closeMenuOnSelect={ true }
        placeholder="Select Color"
        classNamePrefix="react-select"
        isSearchable
        options={ colourOptions }
        styles={ colourStyles }
        onChange={ this.handleChange }
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
//        closeMenuOnSelect={ false }
//        