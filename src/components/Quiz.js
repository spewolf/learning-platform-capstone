import { LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Question from "./Question";
import checkAnswer from "../helpers/question.helper";

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: theme.typography.fontFamily,
  },
}));

export default function Quiz(props) {
  const [numberCompleted, setNumberCompleted] = useState(0);
  const [numberQuestions, setNumberQuestions] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("0 of 0");

  const [value, setValue] = useState("");
  const [content, setContent] = useState(<></>);

  // Question Values
  const [question, setQuestion] = useState(props.assignment.questions[0]);
  const [result, setResult] = useState();

  const classes = useStyles();

  // Update progress after loading new question
  useEffect(() => {
    const numQuestions = props.assignment ? props.assignment.questions.length : 0;
    setNumberQuestions(numQuestions);
    setProgress((numberCompleted / numQuestions) * 100);
    setProgressText(numberCompleted + " of " + numQuestions + " questions answered");
    setQuestion(props.assignment.questions[numberCompleted]);
  }, [numberCompleted, props]);

  const handleCheck = (e) => {
    setResult(checkAnswer(question, value));
  };

  const handleNext = (e) => {
    const result = checkAnswer(question, value);
    props.assignment.questions[numberCompleted].answer = value;
    props.assignment.questions[numberCompleted].result = result;
    setNumberCompleted(numberCompleted + 1);
    setValue("");
    setResult(undefined);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  function calculateScore(a) {
    let score = 0;
    a.questions.forEach((question) => {
      if (question.result === true) {
        score += question.points ?? 1;
      }
    });
    return score;
  }

  function calculateTotal(a) {
    let total = 0;
    a.questions.forEach((question) => {
      total += question.points ?? 1;
    });
    return total;
  }

  // Render question section content
  useEffect(() => {
    if (numberCompleted < numberQuestions) {
      setContent(
        <Question
          question={question}
          onCheck={props.assignment.type == "graded" ? undefined : handleCheck}
          onNext={handleNext}
          onValueChange={handleValueChange}
          result={result}
          value={value}
        />
      );
    } else {
      const score = calculateScore(props.assignment);
      const total = calculateTotal(props.assignment);
      setContent(
        <div>
          <h2>Quiz Complete</h2>
          <p>
            Score: {score} / {total}
          </p>
        </div>
      );
    }
  }, [numberCompleted, numberQuestions, result, question, value, props]);

  return (
    <div className={classes.container}>
      <h1>{props.assignment.title}</h1>
      <p>{progressText}</p>
      <LinearProgress variant="determinate" value={progress} />
      {content}
    </div>
  );
}
