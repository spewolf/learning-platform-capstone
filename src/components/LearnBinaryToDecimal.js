import React, {useEffect} from 'react'

import { Button, Container, Grid, Paper, Zoom } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// Diagrams
import BinToDecUnderstandingDecimal from '../diagrams/BinToDecUnderstandingDecimal.png'
import BinToDecUnderstandingBinary from '../diagrams/BinToDecUnderstandingBinary.png'
import BinToDecStep1 from '../diagrams/BinToDecStep1.png'
import BinToDecStep2 from '../diagrams/BinToDecStep2.png'
import BinToDecTipsAndTricks from '../diagrams/BinToDecTipsAndTricks.png'

const useStyles = makeStyles((theme) => ({
    container: {
      fontFamily: theme.typography.fontFamily,
    },
}));
  

export default function LearnBinaryToDecimal(props) {
    const TOTAL_STEPS = 5;
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
            <Container style={{display: "flex", height: "40em"}}>
                <Zoom in={stepCounter === 1} style={stepCounter === 1 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Understanding the Decimal System</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                In order to understand how the binary (base-2) system works, one must first understand exactly how the decimal (base-10) system works.  
                                Let's take the number 256, for example.  Of course, we all know what 256 is and what quantity it is supposed to represent.  But how is
                                the number actually represented in the base-10 system?
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={BinToDecUnderstandingDecimal}
                                    alt="Diagram showing the breakdown of each digit and it's place value for the decimal number 256."
                                />
                            </Grid>
                            <p>
                                As you can see, each digit in the number 256 has both a value and place value.  For example, the digit 5 has a value of 5 and a place
                                value of 10.  These two are multiplied together to get the actual value that the digit 5 represents in the number 256, which is 50.
                                We do this for all of the digits and add them all up, and that gets us back to our original number of 256.  Notice that, to get the
                                place value for each of the digits, raise 10 to some power, starting at zero on the right and incrementing by one each digit to the
                                right.  Note that we use the number 10 as our base because we are working with a base-10 system.  Now, click the right arrow below to
                                proceed to step 2 and see how this is different for base-2 numbers.
                            </p>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 2} style={stepCounter === 2 ? {} : {display: "none"}}>
                    <div style={{width:"100%"}}>
                        <h3>Understanding the Binary System</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Now that you have a firm grasp on the decimal (base-10) system, it's time to learn about the binary (base-2) system. Let's take a look
                                at the binary number 1010.  This binary number has 4 digits (or bits - short for <strong>b</strong>inary dig<strong>its</strong>).  We
                                can break this number apart just like we did with the base-10 number, except this time, we will use a 2 to calculate each bit's place
                                value instead of a 10.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={BinToDecUnderstandingBinary}
                                    alt="Diagram showing the breakdown of each digit and it's place value for the binary number 1010."
                                />
                            </Grid>
                            <p>
                                As you can see, just knowing this little fact about how binary numbers works is enough information to convert between binary and
                                decimal numbers.  In the next step, we'll do another example and break the conversion process down step-by-step.
                            </p>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 3} style={stepCounter === 3 ? {} : {display: "none"}}>
                    <div style={{width:"100%"}}>
                        <h3>Binary to Decimal Conversion - Step 1</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                The first step to converting a binary number into a decimal number is to list out all of the bits and calculate what each bit represents
                                by looking at its value (either 0 or 1) and its place value (2 to the power of the place's position).  For this example, let's use the
                                8-bit number, 1001 0011.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    width="90%"
                                    src={BinToDecStep1}
                                    alt="Diagram showing the first step of converting the binary number 1001 0011 to decimal."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 4} style={stepCounter === 4 ? {} : {display: "none"}}>
                    <div style={{width:"100%"}}>
                        <h3>Binary to Decimal Conversion - Step 2</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Now that we know what each bit will represent, we will need to actually calculate it.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    width="90%"
                                    src={BinToDecStep2}
                                    alt="Diagram showing the second step of converting the binary number 1001 0011 to decimal."
                                />
                            </Grid>
                            <p>
                                Finally, we'll just add the resulting numbers together and get our answer!
                            </p>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 5} style={stepCounter === 5 ? {} : {display: "none"}}>
                    <div style={{width:"100%"}}>
                        <h3>Tips and Tricks!</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Because binary numbers can only consist of 0s and 1s, we can simplify the previous process a bit.  Let's start by listing the powers of
                                2 from right to left underneath our example number, 1001 0011, just like in step 1.  Notice that we can simply skip over the multiplication
                                step by realizing that the zero bits can be ignored and the one bits can simply have their place value added to the final result.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={BinToDecTipsAndTricks}
                                    alt="Diagram showing a shorter way to convert from binary to decimal."
                                />
                            </Grid>
                            <p>
                                The result remains the same as before.  However, if this is too confusing, you are welcome to continue using the previous
                                steps without taking any shortcuts.  You are now ready for some <a href="/practice">practice!</a>
                            </p>
                        </Paper>
                    </div>
                </Zoom>
            </Container>
            <Container style={{marginTop: "1em"}}>
                <Grid style={{textAlign: "center"}}>
                    <Button disabled={stepCounter === 1} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={decrementStep}>&#60;</Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(1)}>
                        <div style={stepCounter === 1 ? {fontWeight: "bold"} : {}}>Decimal System</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(2)}>
                        <div style={stepCounter === 2 ? {fontWeight: "bold"} : {}}>Binary System</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(3)}>
                        <div style={stepCounter === 3 ? {fontWeight: "bold"} : {}}>Step 1</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(4)}>
                        <div style={stepCounter === 4 ? {fontWeight: "bold"} : {}}>Step 2</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(5)}>
                        <div style={stepCounter === 5 ? {fontWeight: "bold"} : {}}>Tips &amp; Tricks</div>
                    </Button>
                    <Button disabled={stepCounter === TOTAL_STEPS} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={incrementStep}>&#62;</Button>
                </Grid>
            </Container>
        </div>
    )
}
