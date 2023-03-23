import mongoose from 'mongoose';

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.afstpzz.mongodb.net/fullstack?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('Phonebook:');
    persons.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((person) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
