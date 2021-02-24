// this file will be removed and its contents will be transferred to Quiz.js

import React from 'react';
import Question from './Question';
import { Container, Paper } from '@material-ui/core';

export default function QuizExample(props) {
  // TODO: might want to validate entry at some point
  // const [response, setResponse] = React.useState(props.value);

  // const handleChange = (event) => {
  //   setResponse(event.target.value);
  // };
  
  return (
    <Container style={{backgroundColor: '#ffffff', height: '100vh'}}>
      <Paper elevation={3}>
        <Question {...props} />
      </Paper>
    </Container>
  );
}