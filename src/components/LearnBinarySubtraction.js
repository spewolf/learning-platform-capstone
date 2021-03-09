import React from 'react'

import { Button, Container, Grid, Paper, Zoom } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// Diagrams
import SubNibbles from '../diagrams/SubNibbles.png'
import SubNibblesOnesComp from '../diagrams/SubNibblesOnesComp.png'
import SubNibblesTwosComp from '../diagrams/SubNibblesTwosComp.png'
import SubNibblesSolution from '../diagrams/SubNibblesSolution.png'
import SubBytes from '../diagrams/SubBytes.png'
import SubBytesComp from '../diagrams/SubBytesComp.png'
import SubBytesSolution from '../diagrams/SubBytesSolution.png'

const useStyles = makeStyles((theme) => ({
    container: {
      fontFamily: theme.typography.fontFamily,
    },
}));
  

export default function LearnBinaryToDecimal(props) {
    const TOTAL_STEPS = 7;
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
            <Container style={{display: "flex", height: "40em"}}>
                <Zoom in={stepCounter === 1} style={stepCounter === 1 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Subtracting two 4-Bit Numbers</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Note: You will need to know how to add two binary numbers for this section.  If you have not already done so, please complete the Binary
                                Addition learning module.
                            </p>
                            <p>
                                Now that you know how to add binary numbers, the next step is subtracting them!  There are multiple techniques for subtracting binary numbers
                                but we will look at one of the most common ways to do it as this is also how the CPU on a computer subtracts numbers.  Basically, instead of
                                subtracting a positive number from another positive number, we can just add a "negative" number to a positive number and get our result. We 
                                will use the two binary numbers below as an example.  The first step is to convert the bottom number to its negative counterpart (see next
                                page).
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={SubNibbles}
                                    alt="Diagram showing two four-bit numbers to subtract."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 2} style={stepCounter === 2 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>One's Complement</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                The bottom number of our problem is 1001. There are several techniques to convert a binary number to its negative counterpart, but for subtraction,
                                we will use the two's complement method.  To start we need to take the one's complement of our number.  This is very simple.  All we have to do is
                                flip all of the bits.  To do so, just convert every one into a zero and every zero into a one.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={SubNibblesOnesComp}
                                    alt="Diagram showing the one's complement of a 4-bit number."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 3} style={stepCounter === 3 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Two's Complement</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Next, we need to get the two's complement of our original number.  To do that, all we need to do is add one to our one's complement.  This is shown
                                below.  And thus, we find that the negative counterpart of our original number (1001) is 0111.  Now, all we have to do is add this number to the
                                first number in the problem and we'll have our final answer.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={SubNibblesTwosComp}
                                    alt="Diagram showing the two's complement of a 4-bit number."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 4} style={stepCounter === 4 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Adding a Negative Number to Subtract</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Here you can see the 1101 number from the original problem being added to the two's complement we just found.  And since we already know that subtracting
                                a number is mathematically the same as adding a negative number, we know that answer will be the correct one.  But to be sure, we can convert our numbers
                                to decimal and subtract them to check our work.  Be careful that when you convert the second number that you convert the original number (i.e.
                                1001<sub>bin</sub> = 9<sub>dec</sub>).
                            </p>
                            <p>
                                There is one more thing to point out.  Notice how in the problem below, the last three bits we add are 1, 1, and 0.  This gives us the answer
                                10<sub>bin</sub>, but we only write down the zero.  This has to do with the magic of how the 2's complement works mathematically.  You will learn more
                                about this when you learn about signed/unsigned numbers and overflow/underflow of binary numbers.  But for this purpose, just assume that the answer
                                has the same number of bits as the numbers you're subtracting.  Any extra bits can just be discarded.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={SubNibblesSolution}
                                    alt="Diagram showing the process of subtracting two 4-bit numbers."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 5} style={stepCounter === 5 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Now Try Subtracting On Your Own</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                               Now try subtracting these two 1-byte numbers.  The process is exactly the same, so if you need help, feel free to return to the previous steps.  Once you
                               have the two's complement of the bottom number, you can go to the next step to check your work. 
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={SubBytes}
                                    alt="Diagram showing two one-byte numbers to subtract."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 6} style={stepCounter === 6 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Finding the Complements</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Here is the process for obtaining the two's complement of the bottom number.  Make sure you have this correct before moving on.  Once you're done,
                                try converting the numbers to decimal and subtract those to check your answer.  If you can't seem to get the correct answer or just want to
                                triple-check your work, head on to the next step.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={SubBytesComp}
                                    alt="Diagram showing the one's and two's complement of a one-byte number."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 7} style={stepCounter === 7 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Solution</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                Here is the final solution.  If you're still having trouble, feel free to head back to the beginning of the learning module to see the explanations
                                again.  Otherwise, you're ready for some <a href='/practice'>practice</a>!
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={SubBytesSolution}
                                    alt="Diagram showing the process of subtracting two one-byte numbers."
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
                        <div style={stepCounter === 1 ? {fontWeight: "bold"} : {}}>Intro</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(2)}>
                        <div style={stepCounter === 2 ? {fontWeight: "bold"} : {}}>1's Comp</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(3)}>
                        <div style={stepCounter === 3 ? {fontWeight: "bold"} : {}}>2's Comp</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(4)}>
                        <div style={stepCounter === 4 ? {fontWeight: "bold"} : {}}>4-Bit Solution</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(5)}>
                        <div style={stepCounter === 5 ? {fontWeight: "bold"} : {}}>1-Byte</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(6)}>
                        <div style={stepCounter === 6 ? {fontWeight: "bold"} : {}}>1-Byte Comps</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(7)}>
                        <div style={stepCounter === 7 ? {fontWeight: "bold"} : {}}>1-Byte Solution</div>
                    </Button>
                    <Button disabled={stepCounter === TOTAL_STEPS} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={incrementStep}>&#62;</Button>
                </Grid>
            </Container>
        </div>
    )
}
