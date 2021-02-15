import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function RadioButtonsGroup(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Select the correct answer.');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === props.correct) {
      setHelperText('Correct!');
      setError(false);
    }
    else if (value !== '') {
      setHelperText('Try again.');
      setError(true);
    }
    else {
      setHelperText('Select an option.');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <FormLabel component="legend">{props.content}</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}> {
          props.options.map((option, i) => {
            return (<FormControlLabel value={`ans${i}`} label={option} control={<Radio />} />);
          })}
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Check
        </Button>
      </FormControl>
    </form>
  );
}