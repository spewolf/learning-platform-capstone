import { Button, Container, Paper } from '@material-ui/core';
import Checkbox from './Checkbox.js'
import TextEntryBox from './TextEntryBox.js'

export default function PracticeModule(props) {
  return (
    <div>
      <Container style={{backgroundColor: '#ffffff'}}>
        <h1>Practice</h1>
        <div style={{display: "flex"}}>
          <div style={{width: "50%", margin: ".3em"}}>
            <h4>From Assignments</h4>
            <Paper elevation={3}>
              {/* TODO: This should pull from the db to see whether or not the user has any assignments. */}
              <p>You have no assignments.</p>
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
                <p>How many problems?</p><TextEntryBox/>
              </div>
            </Paper>
          </div>
        </div>
        <Button
          fullWidth
          variant="contained"
          color="primary"
        >
          Begin
        </Button>
      </Container>
    </div>
  )
}
