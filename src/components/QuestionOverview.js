import { padBinaryWithZeros, binaryAdd, binarySubtract, binaryToDecimal, decimalToBinary, binaryStrEquality } from '../helpers/binary.helpers'

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core'
import { VerticalBarSeries, ChartLabel, XAxis, YAxis, XYPlot } from 'react-vis'

const useStyles = makeStyles((theme) => ({
  h4: {
    margin: ".3em",
  }
}))

export default function QuestionOverview(props) {
  const classes = useStyles()

  if (!props.question || !props.frequencies) return <div/>

  const content = props.question.content
  const type = props.question.type
  const args = props.question.arguments
  const points = props.question.points
  var correctAnswer
  if (type === "decimalToBinary") {
    correctAnswer = padBinaryWithZeros(decimalToBinary(args), 8)
  } else if (type === "binaryToDecimal") {
    correctAnswer = binaryToDecimal(args)
  } else if (type === "binaryAddition") {
    correctAnswer = padBinaryWithZeros(binaryAdd(args))
  } else if (type === "binarySubtraction") {
    correctAnswer = padBinaryWithZeros(binarySubtract(args))
  }

  var frequenciesData = []
  props.frequencies.forEach((frequency, answer) => {
    if (!answer) {
      frequenciesData.push({x: "(No answer)", y: frequency, color: "#AAAAAA"})
    } else {
      console.log(binaryStrEquality(answer, correctAnswer))
      frequenciesData.push({x: '"' + answer + '"', y: frequency, color: (binaryStrEquality(answer, correctAnswer) === "TRUE" ? "#33BB33" : "#FF6666")})
    }
  })

  return (
    <div>
      <Grid container spacing="3">
        <Grid item xs={6}>
          <h4 className={classes.h4}>Question: {content}</h4>
          <h4 className={classes.h4}>Points: {points}</h4>
          <h4 className={classes.h4}>Type: {type}</h4>
          <h4 className={classes.h4}>Arguments: {args}</h4>
          <h4 className={classes.h4}>Correct answer: {correctAnswer}</h4>
        </Grid>
        <Grid item xs={6}>
          <XYPlot className={classes.xyPlot} height={200} width={450} xType="ordinal" colorType="literal">
            <VerticalBarSeries color="#FF7300" data={frequenciesData}/>
            <XAxis top={125} />
            <YAxis left={19} />
            <ChartLabel style={{textAnchor: "middle"}} includeMargin={false} text="Response" xPercent={0.5} yPercent={1.2} />
            <ChartLabel style={{transform: "rotate(-90)", textAnchor: "middle"}} includeMargin={false} text="Frequency" xPercent={-0.065} yPercent={0.5} />
          </XYPlot>
        </Grid>
      </Grid>
    </div>
  )
}