import { useState, useEffect } from 'react';
import countryService from './services/country';
import weatherService from './services/weather';
import Country from './components/Country';
import Countries from './components/Countries';
import Filter from './components/Filter';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newQuery, setNewQuery] = useState('');
  const [result, setResult] = useState(null);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    if (country || result?.length === 1) {
      const capitalLocation =
        country?.capitalInfo.latlng || result[0]?.capitalInfo.latlng;
      console.log(capitalLocation);
      weatherService
        .get(capitalLocation[0], capitalLocation[1])
        .then((data) => setWeather(data));
    }
  }, [country, result]);

  const search = (evt) => {
    const query = evt.target.value;
    setNewQuery(query);
    setResult(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      )
    );
    if (result?.length !== 1) setCountry(null);
  };

  const showCountry = (name) => {
    setCountry(countries.find((country) => country.name.common === name));
  };

  return (
    <div>
      <Filter value={newQuery} onValueChange={search} />
      {!result ? null : result.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : result.length === 1 ? (
        <Country country={result[0]} weatherInfo={weather} />
      ) : (
        <Countries countries={result} onClick={showCountry} />
      )}
      {country && <Country country={country} weatherInfo={weather} />}
    </div>
  );
};

export default App;
