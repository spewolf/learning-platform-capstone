import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input, FormControl, FormLabel, FormControlLabel } from '@material-ui/core/';

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

export default function TextEntryBox(props) {
  const classes = useStyles();
  const [value] = React.useState(props.value);  // value is what will get returned as "response" in other files

  return (
    <form>
      <FormControl component="fieldset" className={classes.formControl} autoComplete="off">
        <FormLabel component="legend">{props.content}</FormLabel>
        <FormControlLabel control={<Input placeholder="Answer" value={value} margin='100px' onChange={props.onChange} />}/>
      </FormControl>
    </form>
  );
}