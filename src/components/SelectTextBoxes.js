import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectTextBoxes() {
  const classes = useStyles();
  const [opts, setOpts] = React.useState('');

  const handleChange = (event) => {
    setOpts(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="simple-label">Field</InputLabel>
        <Select
          label="simple-label"
          id="simple-select"
          value={opts}
          onChange={handleChange}
        >
          <MenuItem value={1}>Selection 1</MenuItem>
          <MenuItem value={2}>Selection 2</MenuItem>
          <MenuItem value={3}>Selection 3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}