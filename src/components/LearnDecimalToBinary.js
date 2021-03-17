import React, {useEffect} from 'react'

import { Button, Container, Grid, Paper, Zoom } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// Diagrams
import DecToBinOverview from '../diagrams/DecToBinOverview.png'
import DecToBinStep1 from '../diagrams/DecToBinStep1.png'
import DecToBinStep2 from '../diagrams/DecToBinStep2.png'
import DecToBinStep3 from '../diagrams/DecToBinStep3.png'
import DecToBinStep4 from '../diagrams/DecToBinStep4.png'
import DecToBinStep5 from '../diagrams/DecToBinStep5.png'
import DecToBinTipsAndTricks from '../diagrams/DecToBinTipsAndTricks.png'

import * as names from '../LearningModuleNames'

const useStyles = makeStyles((theme) => ({
    h3: {
        paddingLeft: ".9em"
    },
    paper: {
        paddingLeft: "1em",
        paddingTop: ".6em",
        paddingBottom: ".6em",
        paddingRight: "1em"
    },
    container: {
      fontFamily: theme.typography.fontFamily,
    },
}));
  

export default function LearnBinaryToDecimal(props) {
    const TOTAL_STEPS = 7;
    const [stepCounter, setStepCounter] = React.useState(1)

    const classes = useStyles();

    // Set page number if it's specified in props.
    useEffect(() => {
        if (props.page) {
            const page = parseInt(props.page)
            if (page > 0 && page <= TOTAL_STEPS) {
                setStepCounter(parseInt(props.page))
            }
        }
    }, [props.page])

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
            <Container style={{display: "flex", height: "46em"}}>
                <Zoom in={stepCounter === 1} style={stepCounter === 1 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>Decimal to Binary Conversion Overview</h3>
                        <Paper elevation="3"  className={classes.paper}>
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
                <Zoom in={stepCounter === 2} style={stepCounter === 2 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>Decimal to Binary Conversion - Step 1</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <Grid container spacing="3">
                                <Grid item xs={9}>
                                    <p>
                                        The first step of converting any decimal number into binary is to write out the powers of 2 vertically in descending order.  However,
                                        This presents a problem as it's unclear exactly which power of 2 to start with.  In order to know this, we must first know either
                                        one of two things:
                                        <ol>
                                            <li>The actual number that we're converting</li>
                                            <li>The number of bits in the number</li>
                                        </ol>
                                        For these examples, we will be working with 8-bit (or 1 byte) numbers.  So, we can always just start at 2<sup>7</sup>.  If you already
                                        know the number you're about to convert, you can start with the largest power of 2 that is smaller than the number you're trying to
                                        convert.  To the right, you can see all of the powers of 2 listed out top-to-bottom in descending order.
                                    </p>
                                    <p>
                                        TIP: It may be helpful to follow along on a piece of paper to get in the flow of solving these problems on your own.
                                    </p>
                                </Grid>
                                <Grid item xs={3}>
                                    <img
                                        src={DecToBinStep1}
                                        alt="Diagram showing step one of converting a decimal number to binary."
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 3} style={stepCounter === 3 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>Decimal to Binary Conversion - Step 2</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <Grid container spacing="3">
                                <Grid item xs={8}>
                                    <p>
                                        Now that we have all of the powers of 2 listed out, let's begin to work through the problem.  In this example, we will
                                        be converting the decimal number 87.  To do this, we will look at each power of 2 and ask, <strong>"is this power of 2 greater
                                        than or less than/equal to the number we're working with?"</strong>  If the power of 2 is greater than the number we're working
                                        with, that bit will be a zero.  You can see this is the case for the first bit on the right.
                                    </p>
                                    <p>
                                        In the next step, we'll look at what happens when the power of 2 is less than or equal to the number we're working with.
                                    </p>
                                </Grid>
                                <Grid item xs={4}>
                                    <img
                                        src={DecToBinStep2}
                                        alt="Diagram showing step two of converting the decimal number 87 to binary."
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 4} style={stepCounter === 4 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>Decimal to Binary Conversion - Step 3</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <Grid container spacing="3">
                                <Grid item xs={8}>
                                    <p>
                                        The next power of 2, 64, is less than or equal to the number we're working with, 87.  In this case, the bit will be a 1.
                                        But there is also another step when this happens.  We need to subtract the power of 2 from the number we're working with
                                        to get a new number to work with.  We have to do this because the 1 in the 64ths place already accounts for the value of
                                        64.  So, now we have to find the rest of the binary number for 23 (87 - 64).
                                    </p>
                                </Grid>
                                <Grid item xs={4}>
                                    <img
                                        src={DecToBinStep3}
                                        alt="Diagram showing step three of converting the decimal number 87 to binary."
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 5} style={stepCounter === 5 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>Decimal to Binary Conversion - Step 4</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <Grid container spacing="3">
                                <Grid item xs={8}>
                                    <p>
                                        Here, as you can see, we are comparing the number 23, instead of 87, to our powers of 2.  In this case, our power of 2 is
                                        greater than the new number we're working with, so this bit will be a zero.
                                    </p>
                                    <p>
                                        At this point, try to work out the rest of the number on your own before moving on to step 5.
                                    </p>
                                </Grid>
                                <Grid item xs={4}>
                                    <img
                                        src={DecToBinStep4}
                                        alt="Diagram showing step four of converting the decimal number 87 to binary."
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 6} style={stepCounter === 6 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>Decimal to Binary Conversion - Step 5</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <Grid container spacing="3">
                                <Grid item xs={9}>
                                    <p>
                                        The rest of the work is shown on the right.  Check to see if you made any mistakes and learn why you might have made them.
                                        Once you're done, check out the next step for tips and tricks, or get started with some <a href="/practice">practice</a>!
                                    </p>
                                </Grid>
                                <Grid item xs={3}>
                                    <img
                                        width="90%"
                                        src={DecToBinStep5}
                                        alt="Diagram showing the last step of converting the decimal number 87 to binary."
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 7} style={stepCounter === 7 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>Tips and Tricks!</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <Grid container spacing="3">
                                <Grid item xs={9}>
                                    <p>
                                        A helpful tip you might be able to use to do these conversions quicker is to notice what happens when the number we're working
                                        with is equal to the power of 2 that we're comparing it to.  On the right, you'll see the conversion for the decimal number, 72.
                                        In this example, 64 fits into 72, giving us 8 leftover to work with.  Once we compare that 8 with the 8 from 2<sup>3</sup>, notice
                                        that we are left with just a zero.  Since we know that none of the powers of 2 will be less than or equal to zero, we can simply
                                        fill in zeros for the rest of the binary number.  Hence, the last three gray boxes on the right are not really necessary if you
                                        know this trick.
                                    </p>
                                </Grid>
                                <Grid item xs={3}>
                                    <img
                                        width="100%"
                                        src={DecToBinTipsAndTricks}
                                        alt="Diagram showing the convertion of the decimal number 72 to binary."
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
            </Container>
            <Container style={{marginTop: "1em"}}>
                <Grid style={{textAlign: "center"}}>
                    <Button disabled={stepCounter === 1} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={decrementStep}>&#60;</Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(1)}>
                        <div style={stepCounter === 1 ? {fontWeight: "bold"} : {}}>{names.DecToBin1}</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(2)}>
                        <div style={stepCounter === 2 ? {fontWeight: "bold"} : {}}>{names.DecToBin2}</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(3)}>
                        <div style={stepCounter === 3 ? {fontWeight: "bold"} : {}}>{names.DecToBin3}</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(4)}>
                        <div style={stepCounter === 4 ? {fontWeight: "bold"} : {}}>{names.DecToBin4}</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(5)}>
                        <div style={stepCounter === 5 ? {fontWeight: "bold"} : {}}>{names.DecToBin5}</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(6)}>
                        <div style={stepCounter === 6 ? {fontWeight: "bold"} : {}}>{names.DecToBin6}</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(7)}>
                        <div style={stepCounter === 7 ? {fontWeight: "bold"} : {}}>{names.DecToBin7}</div>
                    </Button>
                    <Button disabled={stepCounter === TOTAL_STEPS} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={incrementStep}>&#62;</Button>
                </Grid>
            </Container>
        </div>
    )
}
