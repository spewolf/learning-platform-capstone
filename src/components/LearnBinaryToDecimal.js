import React from 'react'

import { Button, Container, Paper, Zoom } from '@material-ui/core';

export default function LearnBinaryToDecimal(props) {
    const TOTAL_STEPS = 3;
    const [stepCounter, setStepCounter] = React.useState(1)

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
        <div>
            <Container style={{display: "flex", height: "80vh"}}>
                <Zoom in={stepCounter === 1} style={stepCounter === 1 ? {} : {display: "none"}}>
                    <div style={{width: "100%"}}>
                        <h3>Step 1 - Understanding the Decimal System</h3>
                        <Paper elevation="3" style={{padding: ".3em"}}>
                            <p>
                                In order to understand how the binary (base-2) system works, one must first understand exactly how the decimal (base-10) system works.  
                                Let's take the number 256, for example.  Of course, we all know what 256 is and what quantity it is supposed to represent.  But how is
                                the number actually represented in the base-10 system?
                            </p>
                            <div>
                                <div style={{display: "flex"}}>
                                    <Paper style={{paddingLeft: ".3em", paddingRight: ".3em"}}>
                                        <p>2</p>
                                        <p>2(10<sup>2</sup>)</p>
                                        <p>2(100)</p>
                                        <p>200</p>
                                    </Paper>
                                    <Paper style={{paddingLeft: ".3em", paddingRight: ".3em", marginLeft: "1em"}}>
                                        <p>5</p>
                                        <p>5(10<sup>1</sup>)</p>
                                        <p>5(10)</p>
                                        <p>50</p>
                                    </Paper>
                                    <Paper style={{paddingLeft: ".3em", paddingRight: ".3em", marginLeft: "1em"}}>
                                        <p>6</p>
                                        <p>6(10<sup>0</sup>)</p>
                                        <p>6(10)</p>
                                        <p>6</p>
                                    </Paper>
                                </div>
                                <div style={{display: "flex", marginTop: "1em"}}>
                                    <Paper style={{paddingLeft: ".3em", paddingRight: ".3em"}}>
                                        <p>200 + 50 + 6 = 256</p>
                                    </Paper>
                                </div>
                            </div>
                            <p>
                                As you can see, each digit in the number 256 has both a value and place value.  For example, the digit 5 has a value of 5 and a place
                                value of 10.  These two are multiplied together to get the actual value that the digit 5 represents in the number 256, which is 50.
                                We do this for all of the digits and add them all up, and that gets us back to our original number of 256.  Notice that, to get the
                                place value for each of the digits, raise 10 to some power, starting at zero on the right and incrementing by one each digit to the
                                right.  The reason we use 10 here is because we are working with a base-10 system.  Now, click the arrow to the right to proceed to 
                                step 2 and see how this is different for base-2 numbers.
                            </p>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 2} style={stepCounter === 2 ? {} : {display: "none"}}>
                    <div style={{width:"100%"}}>
                        <h3>Step 2 - Understanding the Binary System</h3>
                        <Paper elevation="3">
                            <p>
                                Now that you have a frim grasp on the decimal (base-10) system, now it's time to learn about the binary (base-2) system. TODO
                            </p>
                        </Paper>
                    </div>
                </Zoom>
                <Zoom in={stepCounter === 3} style={stepCounter === 3 ? {} : {display: "none"}}>
                    <div style={{width:"100%"}}>
                        <h3>Step 3 - </h3>
                        <Paper elevation="3">
                            <p>
                            </p>
                        </Paper>
                    </div>
                </Zoom>
            </Container>
            <Container>
                <Button variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={decrementStep}>&#60;</Button>
                <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(1)}>1</Button>
                <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(2)}>2</Button>
                <Button variant="contained" color="primary" style={{margin: ".3em", height: "10%"}} onClick={() => setStepCounter(3)}>3</Button>
                <Button variant="contained" color="secondary" style={{margin: ".3em", height: "10%"}} onClick={incrementStep}>&#62;</Button>
            </Container>
        </div>
    )
}