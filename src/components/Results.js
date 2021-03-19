import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: theme.typography.fontFamily,
  },
  question: {
    marginBottom: "1em",
    paddingBottom: "1em",
    paddingLeft: "1em",
  },
}));

export default function Results(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2>Quiz Complete</h2>
      <p>
        Score: {props.submission.score} / {props.submission.total}
      </p>
      {props.submission.questions.map((e, i) => {
        const bar = e.result ? {borderTop: "4px solid green"} : {borderTop: "4px solid red"}
        return (
          <Card className={classes.question} style={bar} key={i}>
            <h3>{e.content}</h3>
            <h5>You answered {e.result ? " correctly" : " incorrectly"}:</h5>
            {e.answer}
          </Card>
        );
      })}
    </div>
  );
}
