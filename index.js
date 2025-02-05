const express = require("express");
const app = express();
const PORT = 3000;

const phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const phonebookLength = phonebook.length;
const currentDateTime = Date();

// Homepage
app.get("/", (request, response) => {
  response.send("Phone Book List");
});

// Info page with number of phonebook entries and current date
app.get("/info", (request, response) => {
  response.send(
    `<div>Phonebook has info for ${phonebookLength} people.</br></br>${currentDateTime}</div>`
  );
  console.log("Info page should be appearing");
});

// JSON list of all phonebook entries
app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
  console.log("JSON list should be appearing in browser");
});

// Single phonebook entry from JSON list
app.get("/api/phonebook/:personId", (request, response) => {
  console.log("personId parameter... ", request.params.personId);

  const person = phonebook.find((person) => personId === person.id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ message: "Person not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Now listening on Port ${PORT}`);
});
