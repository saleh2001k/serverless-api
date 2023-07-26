const { createPerson, getAllPeople, updatePerson } = require("./index");

test("Create a new person", async () => {
  const newPerson = { id: "1", name: "John Doe", age: 30 };
  await expect(createPerson(newPerson)).resolves.toBeUndefined();
});

test("Get all people", async () => {
  await expect(getAllPeople()).resolves.toStrictEqual([]);
});

test("Update an existing person", async () => {
  const updatedPerson = { id: "1", name: "John Doe", age: 35 };
  await expect(updatePerson(updatedPerson)).resolves.toBeUndefined();
});
