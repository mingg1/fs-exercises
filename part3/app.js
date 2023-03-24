import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import middlewares from './middlewares/middlewares.js';
import Person from './models/phonebook.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

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
app.use(express.static('build'));
app.use(express.json());

app.get('/api/persons', (req, res) => {
  Person.find({}).then((phonebook) => res.json(phonebook));
});

app.post('/api/persons', (req, res) => {
  const { number, name } = req.body;

  if (number) {
    return res.status(400).json({ error: 'Number is required' });
  }
  if (name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const sameName = phonebook.find((person) => person.name === newPerson.name);
  if (sameName) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const person = new Person({ name, number });
  person.save().then((newPerson) => {
    return res.json(newPerson);
  });
});
app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) {
        return res.json(person);
      } else {
        return res.status(404).end();
      }
    })
    .catch((err) => {
      return next(err);
    });
});
app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndUpdate(id, req.body, { new: true })
    .then((updated) => res.json(updated))
    .catch((err) => next(err));
});
app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then((_) => res.status(204).end())
    .catch((err) => next(err));
});
app.get('/info', (req, res) => {
  Person.find({}).then((phonebook) =>
    res.send(`<p>Phonebook has info for ${phonebook.length} people.</p>
  <p>${new Date()}</p>`)
  );
});

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
