import React from 'react';
import { Checkbox } from '@material-ui/core';

export default function Checkboxes(props) {
  // Set up checked state based on props or default state.
  const DEFAULT_STATE = false;
  const [checked, setChecked] = React.useState(props.checked || DEFAULT_STATE);

  // Update checked state and call props.onChange if it exists.
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (props.onChange) {
      props.onChange(event)
    }
  };

  return (
    <Checkbox
      name={props.name}
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'primary checkbox'}}
    />
  );
}