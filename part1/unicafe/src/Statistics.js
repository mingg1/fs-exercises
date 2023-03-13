import StatisticLine from './StasticLine';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={(good + bad * -1) / total || 0} />
      <StatisticLine text="positive" value={`${(good * 100) / total || 0}%`} />
    </table>
  );
};
export default Statistics;
