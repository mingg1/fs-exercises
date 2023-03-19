const Countries = ({ countries, onClick }) => {
  return (
    <ul>
      {countries.map((country) => {
        const name = country.name.common;
        return (
          <li key={name}>
            <p>{name}</p>
            <button onClick={() => onClick(name)}>show</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Countries;
