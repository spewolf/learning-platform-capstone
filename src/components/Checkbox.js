import React from 'react';
import { Checkbox } from '@material-ui/core';

export default function Checkboxes() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox'}}
      />
      <Checkbox
        disabled
        inputProps={{ 'aria-label': 'uncontrolled checkbox' }}
      />
    </div>
  );
}