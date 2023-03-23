import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3001;
let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  })
);
app.use(express.json());
app.use(express.static('build'));

app.get('/api/persons', (req, res) => {
  return res.json(phonebook);
});
app.post('/api/persons', (req, res) => {
  const newPerson = req.body;
  if (!newPerson['number']) {
    return res.status(400).json({ error: 'Number is required' });
  }
  if (!newPerson['name']) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const sameName = phonebook.find((person) => person.name === newPerson.name);
  if (sameName) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  newPerson.id = Math.floor(Math.random() * 100) + (phonebook.length + 1);
  phonebook = phonebook.concat(req.body);
  return res.json(newPerson);
});
app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const info = phonebook.find((person) => person.id === +id);
  return info ? res.json(info) : res.status(404).end();
});
app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  phonebook = phonebook.filter((person) => person.id !== +id);
  return res.status(204).end();
});
app.get('/info', (req, res) => {
  return res.send(
    `<p>Phonebook has info for ${phonebook.length} people.</p>
    <p>${new Date()}</p>`
  );
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
