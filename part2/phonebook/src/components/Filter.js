const Filter = ({ value, onValueChange }) => {
  return (
    <form>
      <div>
        filter shown with
        <input required type="text" value={value} onChange={onValueChange} />
      </div>
    </form>
  );
};

export default Filter;
