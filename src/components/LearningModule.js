import React from 'react'

import { Button, Container, FormControlLabel, Paper, Radio, RadioGroup } from '@material-ui/core'
import LearnBinaryToDecimal from './LearnBinaryToDecimal'
import LearnDecimalToBinary from './LearnDecimalToBinary'
import LearnBinaryAddition from './LearnBinaryAddition'
import LearnBinarySubtraction from './LearnBinarySubtraction'

export default function LearningModule(props) {
  const [coreFunction, setCoreFunction] = React.useState("none")
  const [showAssignment, setShowAssignment] = React.useState(false)

  // Called when the user clicks the "begin" button.
  const begin = (event) => {
    event.preventDefault()

    setShowAssignment(true)
  };

  function radioChange(event) {
    setCoreFunction(event.target.value)
  }

  return (
    <div>
      <div style={showAssignment ? {display: "none"} : {}}>
        <Container>
          <form onSubmit={begin}>
            <h1>Learning</h1>
            <div style={{display: "flex"}}>
              <div style={{width: "50%", margin: ".3em"}}>
                <h4>From Assignments</h4>
                <Paper elevation={3}>
                  {/* TODO: This should pull from the db to see whether or not the user has any assignments. */}
                  <p>You have no learning assignments.</p>
                </Paper>
              </div>
              <div style={{width: "50%", margin: ".3em"}}>
                <h4>Custom</h4>
                <Paper elevation={3} style={{paddingLeft: ".3em"}}>
                  <RadioGroup aria-label="moduleSelection" onChange={radioChange}>
                    <FormControlLabel value="BinToDec" control={<Radio />} label="Binary to Decimal Conversion" />
                    <FormControlLabel value="DecToBin" control={<Radio />} label="Decimal to Binary Conversion" />
                    <FormControlLabel value="Add" control={<Radio />} label="Binary Addition" />
                    <FormControlLabel value="Sub" control={<Radio />} label="Binary Subtraction" />
                  </RadioGroup>
                </Paper>
              </div>
            </div>
            <Button
              disabled={ coreFunction === "none" }
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Begin
            </Button>
          </form>
        </Container>
      </div>
      <div style={(coreFunction === "BinToDec" && showAssignment) ? {} : {display: "none"}}>
        <LearnBinaryToDecimal/>
      </div>
      <div style={(coreFunction === "DecToBin" && showAssignment) ? {} : {display: "none"}}>
        <LearnDecimalToBinary/>
      </div>
      <div style={(coreFunction === "Add" && showAssignment) ? {} : {display: "none"}}>
        <LearnBinaryAddition/>
      </div>
      <div style={(coreFunction === "Sub" && showAssignment) ? {} : {display: "none"}}>
        <LearnBinarySubtraction/>
      </div>
    </div>
  )
}
