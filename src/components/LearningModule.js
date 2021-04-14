import React, { useEffect } from 'react'
import { withRouter } from 'react-router'

import queryString from 'query-string'

import { Button, Container, FormControlLabel, Paper, Radio, RadioGroup } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";

import LearnBinaryToDecimal from './LearnBinaryToDecimal'
import LearnDecimalToBinary from './LearnDecimalToBinary'
import LearnBinaryAddition from './LearnBinaryAddition'
import LearnBinarySubtraction from './LearnBinarySubtraction'

import { Names } from '../LearningModuleNames'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
      paddingLeft: "1em",
      paddingTop: ".6em",
      paddingBottom: ".6em",
      paddingRight: "1em",
      marginBottom: "1em"
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

  return (
    <div>
      <div style={showAssignment ? {display: "none"} : {}}>
        <Container className={classes.container}>
          <h3 style={{paddingLeft: ".9em"}}>Choose a module to begin</h3>
          <Paper elevation={3} className={classes.paper}>
            {Names.map((module) => {
              return (
                <div style={{padding: ".3em"}}>
                  <a style={{textDecoration: "none"}} href={"/learning?module=" + module.moduleName}>
                    <Button
                      color="primary"
                      style={{padding: "0em"}}>
                        <strong>{module.moduleFullName}</strong>
                    </Button>
                  </a>
                  <p style={{margin: "0em"}}>{module.steps.length} Steps</p>
                  <hr/>
                </div>
              )
            })}
          </Paper>
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