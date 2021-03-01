import React from 'react'

import { Button, Container, Paper } from '@material-ui/core';

export default function LearningModule(props) {
  const [coreFunction, setCoreFunction] = React.useState("No module type selected.")
  const [showAssignment, setShowAssignment] = React.useState(false)

  // Called when the user clicks the "begin" button.
  const begin = (event) => {
    event.preventDefault()

    // TODO: Set core function.
    setCoreFunction("No module type selected.")
    setShowAssignment(true)
  };

  // TODO: Add radio button listener

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
                <Paper elevation={3}>
                  {/* TODO: Radio buttons */}
                  <p>Radio buttons go here.</p>
                </Paper>
              </div>
            </div>
            <Button
              disabled={
                // TODO: Disable the button if none of the radio buttons are clicked.
                false
              }
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
      <Container style={showAssignment ? {} : {display: "none"}}>
        {/* TODO: Learning modules */}
        <p>{coreFunction}</p>
      </Container>
    </div>
  )
}
