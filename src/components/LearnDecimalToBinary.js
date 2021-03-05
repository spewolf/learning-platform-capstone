import React from 'react'

import { Button, Container, Grid, Paper, Zoom } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// Diagrams
import DecToBinOverview from '../diagrams/DecToBinOverview.png'

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
            <Container style={{display: "flex", height: "45em"}}>
                <Zoom in={stepCounter === 1} style={stepCounter === 1 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Decimal to Binary Conversion Overview</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Note: It's helpful to have completed the binary to decimal conversion module before this one as it explains how the binary system works
                                relative to the decimal system.
                            </p>
                            <p>
                                To convert from a decimal number to a binary number, we use a rather different strategy.  The general strategy is to which power of 2
                                the decimal number will fit into and use that information to get a 0 or a 1.  If the decimal number does fit into a power of two, we
                                subtract the two numbers to get a new number.  A short example is below with the number 10<sub>dec</sub>.  If it isn't clear how it works
                                at this point, don't worry; the next steps will go into detail with a step-by-step example.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={DecToBinOverview}
                                    alt="Diagram showing an overview of how the decimal to binary conversion process works by converting the decimal number 10 to the
                                    binary number 1010."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
            </Container>
            <Container style={{marginTop: "1em"}}>
                <Grid style={{textAlign: "center"}}>
                    <Button disabled={stepCounter === 1} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={decrementStep}>&#60;</Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(1)}>
                        <div style={stepCounter === 1 ? {textDecoration: "underline", fontWeight: "bold"} : {}}>1</div>
                    </Button>
                    <Button disabled={stepCounter === TOTAL_STEPS} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={incrementStep}>&#62;</Button>
                </Grid>
            </Container>
        </div>
    )
}
