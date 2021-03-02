import React from 'react'

import { Button, Container, Paper, Zoom } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
      fontFamily: theme.typography.fontFamily,
    },
}));
  

export default function LearnBinaryToDecimal(props) {
    const TOTAL_STEPS = 1;
    const [stepCounter, setStepCounter] = React.useState(1)

    const classes = useStyles();

    function decrementStep() {
        if (stepCounter > 1) {
            setStepCounter(stepCounter-1)
        }
    }

    function incrementStep() {
        if (stepCounter < TOTAL_STEPS) {
            setStepCounter(stepCounter+1)
        }
    }

    return (
        <div className={classes.container}>
            <Container style={{display: "flex"}}>
                <Zoom in={stepCounter === 1} style={stepCounter === 1 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Step Header</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Placeholder for the Decimal To Binary learning module component.
                            </p>
                        </Paper>
                    </div>
                </Zoom>
            </Container>
            <Container style={{marginTop: "1em"}}>
                <Button disabled={stepCounter === 1} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={decrementStep}>&#60;</Button>
                <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(1)}>
                    <div style={stepCounter === 1 ? {textDecoration: "underline", fontWeight: "bold"} : {}}>1</div>
                </Button>
                <Button disabled={stepCounter === TOTAL_STEPS} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={incrementStep}>&#62;</Button>
            </Container>
        </div>
    )
}
