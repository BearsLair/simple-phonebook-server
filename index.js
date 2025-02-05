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

app.get("/", (request, response) => {
  response.send("Phone Book List");
});

app.get("/info", (request, response) => {
  //   response.header("Content-type", "text/html");
  response.send(
    `<div>Phonebook has info for ${phonebookLength} people.</br></br>${currentDateTime}</div>`
  );
  console.log("Info page should be appearing");
});

app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
  console.log("JSON list should be appearing in browser");
});

app.listen(PORT, () => {
  console.log(`Now listening on Port ${PORT}`);
});
