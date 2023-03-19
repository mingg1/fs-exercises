const Country = ({ country, weatherInfo }) => (
  <>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital.map((c) => `${c} `)}</p>
    <p>Area: {country.area}</p>
    <h3>Languages</h3>
    <ul>
      {Object.values(country.languages).map((lan) => (
        <li key={lan}>{lan}</li>
      ))}
    </ul>
    <figure>
      <img src={country.flags.png} alt={country.flags.alt} />
    </figure>
    <h2>Weather in {weatherInfo?.name}</h2>
    <p>temprature {weatherInfo?.main.temp} celcius</p>
    <figure>
      <img
        src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`}
        alt={weatherInfo?.weather[0].description}
      />
    </figure>
    <p>wind {weatherInfo?.wind.speed} m/s</p>
  </>
);

export default Country;
