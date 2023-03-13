import { useState } from 'react';
import Button from './Button';
import Header from './Header';
import Statistics from './Statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseCount = (count, setCount) => () => setCount(++count);

  return (
    <>
      <Header title="give feedback" />
      <div>
        <Button onClick={increaseCount(good, setGood)} content="good" />
        <Button
          onClick={increaseCount(neutral, setNeutral)}
          content="neutral"
        />
        <Button onClick={increaseCount(bad, setBad)} content="bad" />
      </div>
      <Header title="statistics" />
      {!(good || neutral || bad) ? (
        'No feedback given :>'
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </>
  );
};

export default App;
