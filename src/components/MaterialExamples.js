import React from 'react';
import { 
  Container, Box, Button, IconButton, Fab, Paper, Accordion,
  AccordionSummary, AccordionDetails, Typography, Toolbar, AppBar, 
  CircularProgress, LinearProgress, Snackbar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';

export default class MaterialExamples extends React.Component {
  RegularButton(text) {
    return (
      <Button variant="contained" color="primary">
        {text}
      </Button>
    );
  }

  DisabledButton(text) {
    return (
      <Button variant="contained" disabled>
        {text}
      </Button>
    )
  }

  DeleteIconButton() {
    return (
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    );
  }

  MixedDeleteIconButton() {
    return (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
      >
      Delete
      </Button>
    );
  }

  AddFab() {
    return (
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    );
  }

  SimpleAccordion() {
    return (
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Expand me</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can put a ton of text and information here and hide it when not in use.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Another one</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              I don't have anything in particular to say here.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Top secret information</Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    );
  }

  StaticAppBar() {
    return ( 
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Toolbar Module
            </Typography>
            <Button color="inherit">
              Button
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    );
  }

  UnknownProgress() {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  KnownProgress() {
    const total = 35;
    return (
      <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={total} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textPrimary">
          {total}%
        </Typography>
      </Box>
    </Box>
    );
  }

  PersistentSnackbar() {
    const open = true;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={300}
          message="Here's a snackbar."
          action={
            <React.Fragment>
              <Button color="secondary" size="small">
                CLOSE
              </Button>
            </React.Fragment>
          }
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Box bgcolor="#4F2C1D">
          <Container style={{ backgroundColor: '#FF7300', height: '200vh' }}>
            {this.RegularButton("Yeah")}
            {this.DisabledButton("Nope")}
            <Paper variant="outlined" elevation={3}>
              {this.DeleteIconButton()}
              {this.MixedDeleteIconButton()}
            </Paper>
            {this.AddFab()}
            {this.SimpleAccordion()}
            {this.StaticAppBar()}
            {this.UnknownProgress()}
            {this.KnownProgress()}
            {this.PersistentSnackbar()}
          </Container>
        </Box>
      </div>
    );
  }
}
