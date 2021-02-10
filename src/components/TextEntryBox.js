import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input, TextField, FormHelperText, FormControl, FormLabel, FormControlLabel, Button } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      
    },
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  formControl: {
    margin: theme.spacing(3),
    width: '17ch',
  },
}));

export default function TextEntryBox() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const handleInput = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === '0100') {
      setHelperText('Correct!');
      setError(false);
    }
    else if (value !== '') {
      setHelperText('Try again.');
      setError(true);
    }
    else {
      setHelperText('Enter your answer');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" className={classes.formControl} error={error} autoComplete="off">
        <FormLabel component="legend">What is 4 in binary?</FormLabel>
        <FormControlLabel control={<Input placeholder="Answer" value={value} margin='100px' onChange={handleInput} />}/>
        <FormHelperText>{helperText}</FormHelperText> 
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Check
        </Button>
      </FormControl>
    </form>
  );
}