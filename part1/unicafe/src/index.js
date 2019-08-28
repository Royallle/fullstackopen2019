import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
    return (
      <>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </>
    )
}

const Button = (props) => {
    return (<button onClick={props.onClick}>
      {props.text}
    </button>)
}

const Statistics = (props) => {

  const sumFeedback = () => {
    return props.stats.statsGood+
           props.stats.statsNeutral+
           props.stats.statsBad;
  }

  const calculateAverage = () => {
    if(sumFeedback() > 0) {
        return (((props.stats.statsGood*1)+(props.stats.statsBad*-1))/sumFeedback()).toFixed(1);
    } else {
        return 0
    }  
  }

  const calculatePositivePercentange = () => {
      if (sumFeedback() > 0) {
        return ((props.stats.statsGood/sumFeedback())*100).toFixed(1);
      } else {
          return 0;
      }
  }

  if(sumFeedback() > 0) {
    return (
      <div>
          <table>
            <tbody>
              <tr><Statistic text={"good"} value={props.stats.statsGood} /></tr>
              <tr><Statistic text={"neutral"}  value={props.stats.statsNeutral} /></tr>
              <tr><Statistic text={"bad"} value={props.stats.statsBad} /></tr>
              <tr><Statistic text={"all"} value={sumFeedback()} /></tr>
              <tr><Statistic text={"average"} value={calculateAverage()} /></tr>
              <tr><Statistic text={"positive"} value={calculatePositivePercentange()+' %'} /></tr>
            </tbody>
          </table>
      </div>
    )
  } else {
    return (
      <div>
        <h3>No feedback given</h3>
      </div>
    )
  }
  
}  

const App = () => {
  // save clicks of each button to own state
  const [counters, setCounters] = useState({
    good:0,neutral:0,bad:0
  })

  const increaseGood = () => setCounters({...counters,good: counters.good+1})
  const increaseNeutral = () => setCounters({...counters,neutral: counters.neutral+1})
  const increaseBad = () => setCounters({...counters,bad: counters.bad+1})

  return (
    <div>
        <h1>give feedback</h1>
        <Button onClick={() => increaseGood()} text={"good"} />
        <Button onClick={() => increaseNeutral()} text={"neutral"} />
        <Button onClick={() => increaseBad()} text={"bad"} />
        <h1>statistics</h1>
        <Statistics stats={{statsGood:counters.good, statsNeutral:counters.neutral, statsBad:counters.bad }}  />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)