const Filter = ({ value, onValueChange }) => {
  return (
    <form>
      <div>
        Find countries{' '}
        <input required type="text" value={value} onChange={onValueChange} />
      </div>
    </form>
  );
};

export default Filter;
