import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => {
    return (
        <div>
            {props.text} {props.counter}
        </div>
    )
}

const Button = (props) => (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good+1)
  const increaseNeutral = () => setNeutral(neutral+1)
  const increaseBad = () => setBad(bad+1)

  const sumFeedback = () => {
      return good+neutral+bad;
  }
  const calculateAverage = () => {
    if(sumFeedback() > 0) {
        return ((good*1)+(bad*-1))/sumFeedback();
    } else {
        return 0
    }  
  }

  const calculatePositivePercentange = () => {
      if(sumFeedback() > 0) {
        return (good/sumFeedback())*100;
      } else {
          return 0;
      }
  }


  return (
    <div>
        <h1>give feedback</h1>
        <Button onClick={() => increaseGood()} text={"good"} />
        <Button onClick={() => increaseNeutral()} text={"neutral"} />
        <Button onClick={() => increaseBad()} text={"bad"} />
        <h1>statistics</h1>
        <Display text={"good"} counter={good} />
        <Display text={"neutral"}  counter={neutral} />
        <Display text={"bad"} counter={bad} />
        <Display text={"all"} counter={sumFeedback()} />
        <Display text={"average"} counter={calculateAverage()} />
        <Display text={"positive"} counter={calculatePositivePercentange()} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)