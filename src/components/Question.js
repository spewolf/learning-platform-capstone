import React from 'react';
import TextEntryBox from './TextEntryBox';
import { Button } from '@material-ui/core';

export default function Question(props) {
  // may need type="submit" etc in Buttons
  return (
    <form>
      <TextEntryBox onChange={props.onChange} content={props.content} />
      <div style={{display: "flex"}}>
        <Button onClick={props.onCheck} variant="contained" color="primary">Check</Button>
        <Button onClick={props.onNext} variant="contained" color="primary">Next</Button>
      </div>
    </form>
  );
}