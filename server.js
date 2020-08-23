const express = require('express');
const app = express();
const port = 3000;
const Notee = require('./models/note.model.js');

app.get('/', (req, res) => {
  res.send('Welcome to the To Do App!')
});

app.get('/notes', function(req, res) {
  Notee.findAll().then(notes => res.json(notes));
});


 var date = new Date(Date.now()).toISOString();
  // Note: using `force: true` will drop the table if it already exists
  Notee.sync({ force: false }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return Notee.create({
    Title: 'Test Note V2',
    Body: 'Test Note Body V2',
    deadlinedate: date,
    Image: "hi"
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
