import React from 'react'

import { Button, Container, Paper, Zoom } from '@material-ui/core';

export default function LearnBinaryToDecimal(props) {
    const TOTAL_STEPS = 2;
    const [stepCounter, setStepCounter] = React.useState(0)

    function decrementStep() {
        if (stepCounter > 0) {
            setStepCounter(stepCounter-1)
        }
    }

    function incrementStep() {
        if (stepCounter < TOTAL_STEPS-1) {
            setStepCounter(stepCounter+1)
        }
    }

    return (
        <Container style={{display: "flex"}}>
            <Button variant="contained" color="primary" style={{margin: "1em"}} onClick={decrementStep}>&#60;</Button>
            <Zoom in={stepCounter === 0} style={stepCounter === 0 ? {} : {display: "none"}}>
                <Paper elevation="3">
                    <p>test1</p>
                </Paper>
            </Zoom>
            <Zoom in={stepCounter === 1} style={stepCounter === 1 ? {} : {display: "none"}}>
                <Paper elevation="3">
                    <p>test2</p>
                </Paper>
            </Zoom>
            <Button variant="contained" color="primary" style={{margin: "1em"}} onClick={incrementStep}>&#62;</Button>
        </Container>
    )
}