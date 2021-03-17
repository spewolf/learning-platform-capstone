import React, { useEffect } from 'react'

import { Button, Container, Grid, Paper, Zoom } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// Diagrams
import AddOneBit from '../diagrams/AddOneBit.png'
import AddNibble from '../diagrams/AddNibble.png'
import AddOneByte from '../diagrams/AddOneByte.png'
import AddOneByteSolution from '../diagrams/AddOneByteSolution.png'

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
    const TOTAL_STEPS = 4;
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
                        <h3 className={classes.h3}>Adding Two 1-bit Numbers in Binary</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <p>
                                We can add numbers in binary similar to how we can add numbers in decimal.  Below, you can see all of the solutions to adding two bits
                                together.  The first three are pretty straight-forward as they are the same in both decimal and binary.  But the last one is a little
                                bit different (pun intended).  In decimal, we would add 1 + 1 and get 2.  But there is no digit to represent 2 in binary!  So, instead,
                                we have to use the binary representation of 2, which is 10<sub>bin</sub>.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={AddOneBit}
                                    alt="Diagram showing the process of adding two bits together."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 2} style={stepCounter === 2 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>Adding Numbers with More than 1 Bit in Binary</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <p>
                                Now, what if we wanted to add two numbers with more than one bit?  We can do this just like we would with decimal numbers as well.
                                First, we line up the numbers with one above the other.  Then, we add one bit at a time starting from the right and working our way
                                to the left.  The first one on the right is easy: 0 + 1 = 1.
                            </p>
                            <p>
                                Then, moving over one to the left, we have 1 + 1, which is 2.  But as
                                we saw in the last step, we can't just write a 2 because there is no digit for 2 in binary.  So, we have to carry the 1 and write down
                                the 0 (remember that 2<sub>dec</sub> = 10<sub>bin</sub>).  You can see below that the 1 is carried over to the left and the 0 is recorded
                                below.
                            </p>
                            <p>
                                Next, we have 1 + 1 again, but we also have to account for the 1 we just carried.  Now, we have 1 + 1 + 1, which is 3.  Again,
                                there is no 3 in binary.  But, 3<sub>dec</sub> = 11<sub>bin</sub>.  So, in this case, we carry the 1 and also record a 1.
                            </p>
                            <p>
                                Finally, we have 0 + 0, but with a 1 carried in.  So this is 1 + 0 + 0, which is just 1.  And now we get our answer: 1101.
                            </p>
                            <p>
                                One more thing: A good way to check to see if your answer is correct is to convert the two numbers you're adding and the answer into
                                decimal numbers.  Then, you can check to make sure the two numbers add up to the correct number in decimal.  If they do, you likely did
                                everything correct!
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={AddNibble}
                                    alt="Diagram showing the process of adding two 4-bit numbers together."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 3} style={stepCounter === 3 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>Adding Two 1-Byte Numbers in Binary</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <p>
                                Now, try this one on your own.  Don't forget to check your answer by converting all of the numbers to decimal!  Once you're done, you
                                can find the solution on the next step.
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={AddOneByte}
                                    alt="Diagram showing two bytes to add together."
                                />
                            </Grid>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 4} style={stepCounter === 4 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3 className={classes.h3}>1-Byte Solution</h3>
                        <Paper elevation="3" className={classes.paper}>
                            <p>
                                Here is the solution worked out:
                            </p>
                            <Grid style={{textAlign: "center"}}>
                                <img
                                    src={AddOneByteSolution}
                                    alt="Diagram showing the process of adding two bytes together."
                                />
                            </Grid>
                            <p>
                                Did you get it right?  If you did, head on over to <a href="/practice">practice</a> for more!  If not, have a look at the solution
                                and try to figure out where you might have made a mistake.
                            </p>
                        </Paper>
                    </div>
                </Zoom>
            </Container>
            <Container style={{marginTop: "1em"}}>
                <Grid style={{textAlign: "center"}}>
                    <Button disabled={stepCounter === 1} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={decrementStep}>&#60;</Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(1)}>
                        <div style={stepCounter === 1 ? {fontWeight: "bold"} : {}}>{names.Add1}</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(2)}>
                        <div style={stepCounter === 2 ? {fontWeight: "bold"} : {}}>{names.Add2}</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(3)}>
                        <div style={stepCounter === 3 ? {fontWeight: "bold"} : {}}>{names.Add3}</div>
                    </Button>
                    <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(4)}>
                        <div style={stepCounter === 4 ? {fontWeight: "bold"} : {}}>{names.Add4}</div>
                    </Button>
                    <Button disabled={stepCounter === TOTAL_STEPS} variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={incrementStep}>&#62;</Button>
                </Grid>
            </Container>
        </div>
    )
}
