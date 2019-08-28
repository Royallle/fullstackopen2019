import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

  const [selected, setSelected] = useState({
      index:0,
      votes:[0,0,0,0,0]
  })

  const selectRandom = () => setSelected({...selected, index: Math.floor((Math.random() * 5))});
  const setVotes = () => {
    const copy = [...selected.votes];
    copy[selected.index]+=1
    setSelected({...selected, votes: [...copy]})
  }
  
  const selectMostVoted = () => {
    return selected.votes.indexOf(Math.max.apply(null, selected.votes));
  }

  let topAnecdote = selectMostVoted();

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <div>
            {props.anecdotes[selected.index]} has {selected.votes[selected.index]} votes
            <div>
                <button onClick={() => setVotes()}>
                    vote
                </button>
                <button onClick={() => selectRandom()}>
                    next anecdote
                </button>
            </div>
        </div>

        <h1>Anecdote with most votes</h1>
        <div>
            {props.anecdotes[topAnecdote]} has {selected.votes[topAnecdote]} votes
        </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)