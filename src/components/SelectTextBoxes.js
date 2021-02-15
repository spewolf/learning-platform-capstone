import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { InputLabel, MenuItem, FormControl, FormLabel, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectTextBox(props) {
  const classes = useStyles();
  const [opts, setOpts] = React.useState('');

  const handleChange = (event) => {
    setOpts(event.target.value);
  };

  return (
    <div>
      <FormLabel component="legend">{props.content}</FormLabel>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Select...</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="selections"
          value={opts}
          onChange={handleChange}
        >{
          props.options.map((option, i) => {
            return <MenuItem value={`ans${i}`}>{option}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}