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
              <Paper elevation={3} style={{paddingLeft: ".3em", margin: "1em"}}>
                <RadioGroup aria-label="moduleSelection" onChange={radioChange}>
                  <FormControlLabel value="BinToDec" control={<Radio />} label="Binary to Decimal Conversion" />
                  <FormControlLabel value="DecToBin" control={<Radio />} label="Decimal to Binary Conversion" />
                  <FormControlLabel value="Add" control={<Radio />} label="Binary Addition" />
                  <FormControlLabel value="Sub" control={<Radio />} label="Binary Subtraction" />
                </RadioGroup>
              </Paper>
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
