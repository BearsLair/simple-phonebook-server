const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;

// JSON list of persons in phonebook, present in code for learning purposes
let phonebook = [
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
});

// JSON list of all phonebook entries
app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
  console.log("JSON list should be appearing in browser");
});

// Single phonebook entry from JSON list
app.get("/api/phonebook/:personId", (request, response) => {
  const person = phonebook.find((person) => personId === person.id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ message: "Person not found" });
  }
});

// Delete single entry from JSON list
app.delete("/api/phonebook/:personId", (request, response) => {
  const deleteIndex = phonebook.findIndex(
    (person) => request.params.personId === person.id
  );
  phonebook.splice(deleteIndex, 1);

  response.send("Entry deleted");
});

// Crude method of generating id's, but works for the time being
const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

// Add single entry
app.post("/api/phonebook", (request, response) => {
  const addRequest = request.body;

  // If name or number is not in the request
  if (!("name" in addRequest)) {
    return response.status(400).send("missing name");
  } else if (!("number" in addRequest)) {
    return response.status(400).send("missing number");
  }

  // Section of code handles name duplicate error
  let repeatedNameCount = 0;
  phonebook.map((person) => {
    person.name === addRequest.name ? repeatedNameCount++ : null;
  });

  console.log(repeatedNameCount);

  if (repeatedNameCount > 0) {
    return response.status(400).send("person's name already exists");
  }

  const id = generateId();
  const newPerson = { id: `${id}`, ...addRequest };
  phonebook.push(newPerson);
  response.send("New entry posted");
});

app.listen(PORT, () => {
  console.log(`Now listening on Port ${PORT}`);
});
