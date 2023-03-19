import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

const get = (lat, lon) => {
  const request = axios.get(
    `${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
  );
  return request.then((response) => {
    return response.data;
  });
};

export default { get };
