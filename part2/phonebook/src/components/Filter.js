const Filter = ({ onSubmit, value, onValueChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        filter shown with
        <input required type="text" value={value} onChange={onValueChange} />
      </div>
    </form>
  );
};

export default Filter;
