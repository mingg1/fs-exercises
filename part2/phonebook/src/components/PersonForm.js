const PersonForm = ({
  onSubmit,
  name,
  number,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input required type="text" value={name} onChange={onNameChange} />
      </div>
      <div>
        number:
        <input
          required
          type={'text'}
          value={number}
          onChange={onNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
