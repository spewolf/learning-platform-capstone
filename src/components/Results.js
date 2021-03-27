import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getAnswer, getHelp } from "../helpers/question.helper";

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: theme.typography.fontFamily,
  },
  question: {
    marginBottom: "1em",
    paddingBottom: "1em",
    paddingLeft: "1em",
    "& h3": {
      margin: "0",
    },
  },
  header: {
    display: "flex",
    paddingTop: "1rem",
  },
  points: {
    marginLeft: "auto",
    marginRight: "1rem",
  },
  middleText: {
    textAlign: "center",
    width: "100%",
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
        const bar = e.result ? { borderTop: "4px solid green" } : { borderTop: "4px solid red" };
        return (
          <Card className={classes.question} style={bar} key={i}>
            <div className={classes.header}>
              <h3>{e.content}</h3>
              <div className={classes.points}>{e.points}pts</div>
            </div>
            <div className={classes.middleText}>
              <h5>You answered {e.result ? " correctly" : " incorrectly"}:</h5>
              {e.answer}
              {!props.hideAnswers && !e.result ? (
                <>
                  <h5>The correct answer was:</h5>
                  {getAnswer(e)}
                  {getHelp(e)}
                </>
              ) : (
                <></>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
