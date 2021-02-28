import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: theme.typography.fontFamily,
    padding: "1rem",
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    "& > *": {
      marginLeft: ".5rem",
    },
    marginTop: "1rem",
    height: "3rem",
  },
}));

export default function Question(props) {
  // may need type="submit" etc in Buttons
  const classes = useStyles();
  const [value, setValue] = useState("");

  var checkText = <></>;
  if (props.result !== undefined) {
    checkText = props.result ? (
      <p style={{ color: "green" }}>Correct!</p>
    ) : (
      <p style={{ color: "red" }}>Incorrect!</p>
    );
  }

  const handleNext = (e) => {
    props.onNext(e);
    setValue("");
  };

  const handleChange = (e) => {
    props.onChange(e);
    setValue(e.target.value);
  };

  return (
    <Paper className={classes.container}>
      <form>
        <h2>{props.question.content}</h2>
        <TextField
          required
          fullWidth
          label="Answer"
          onChange={handleChange}
          placeholder="Type your answer"
          value={value}
        />
        {checkText}
        <div className={classes.buttonBar}>
          <Button onClick={props.onCheck} variant="contained" color="primary">
            Check
          </Button>
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>
    </Paper>
  );
}
