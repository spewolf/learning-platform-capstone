import { Button, Container, Paper } from '@material-ui/core';
import Checkbox from './Checkbox.js'

export default function PracticeModule(props) {
  const begin = (event) => {
    event.preventDefault();
    console.log("test")
  };

  return (
    <div>
      <Container style={{backgroundColor: '#ffffff'}}>
        <form onSubmit={begin}>
          <h1>Practice</h1>
          <div style={{display: "flex"}}>
            <div style={{width: "50%", margin: ".3em"}}>
              <h4>From Assignments</h4>
              <Paper elevation={3}>
                {/* TODO: This should pull from the db to see whether or not the user has any assignments. */}
                <p>You have no practice assignments.</p>
              </Paper>
            </div>
            <div style={{width: "50%", margin: ".3em"}}>
              <h4>Custom</h4>
              <Paper elevation={3}>
                <div style={{display: "flex"}}>
                  <Checkbox/><p>Binary to Decimal Conversion</p>
                </div>
                <div style={{display: "flex"}}>
                  <Checkbox/><p>Decimal to Binary Conversion</p>
                </div>
                <div style={{display: "flex"}}>
                  <Checkbox/><p>Binary Addition and Subtraction</p>
                </div>
                <div style={{display: "flex"}}>
                  <p>How many problems?</p>
                </div>
              </Paper>
            </div>
          </div>
          <Button
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
  )
}

