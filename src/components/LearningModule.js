import React, { useEffect } from 'react'
import { withRouter } from 'react-router'

import queryString from 'query-string'

import { Button, Container, FormControlLabel, Paper, Radio, RadioGroup } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";

import LearnBinaryToDecimal from './LearnBinaryToDecimal'
import LearnDecimalToBinary from './LearnDecimalToBinary'
import LearnBinaryAddition from './LearnBinaryAddition'
import LearnBinarySubtraction from './LearnBinarySubtraction'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}))

const LearningModule = (props) => {
  props.setLocation("Learn")
  
  const [coreFunction, setCoreFunction] = React.useState("none")
  const [pageNumber, setPageNumber] = React.useState(1)
  const [showAssignment, setShowAssignment] = React.useState(false)
  
  const classes = useStyles()

  // Set up module directly if it's specified in query strings.
  useEffect(() => {
    const qs = queryString.parse(props.location.search)
    const queryModule = qs.module
    if (queryModule === "BinToDec"
     || queryModule === "DecToBin"
     || queryModule === "Add"
     || queryModule === "Sub") {
      setCoreFunction(queryModule)
      setShowAssignment(true)
    }

    const page = qs.page
    if (page) {
      setPageNumber(page)
    }
  }, [props.location.search])

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
        <Container className={classes.container}>
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
      <div className={classes.container} style={(coreFunction === "BinToDec" && showAssignment) ? {} : {display: "none"}}>
        <LearnBinaryToDecimal page={pageNumber}/>
      </div>
      <div className={classes.container} style={(coreFunction === "DecToBin" && showAssignment) ? {} : {display: "none"}}>
        <LearnDecimalToBinary page={pageNumber}/>
      </div>
      <div className={classes.container} style={(coreFunction === "Add" && showAssignment) ? {} : {display: "none"}}>
        <LearnBinaryAddition page={pageNumber}/>
      </div>
      <div className={classes.container} style={(coreFunction === "Sub" && showAssignment) ? {} : {display: "none"}}>
        <LearnBinarySubtraction page={pageNumber}/>
      </div>
    </div>
  )
}

export default withRouter(LearningModule)