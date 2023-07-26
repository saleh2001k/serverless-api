const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "people";

const createPerson = async (person) => {
  try {
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id: person.id,
          name: person.name,
          age: person.age,
        },
      })
    );
    console.log(`Created new person with id: ${person.id}`);
  } catch (err) {
    console.error("Error creating person:", err.message);
  }
};

const getAllPeople = async () => {
  try {
    const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
    return result.Items;
  } catch (err) {
    console.error("Error fetching all people:", err.message);
    return [];
  }
};

const getPersonById = async (id) => {
  try {
    const result = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          id: id,
        },
      })
    );
    console.log("Fetched person by ID:", result.Item); 
    return result.Item;
  } catch (err) {
    console.error("Error fetching person by ID:", err.message);
    return null;
  }
};

const updatePerson = async (person) => {
  try {
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id: person.id,
          name: person.name,
          age: person.age,
        },
      })
    );
    console.log(`Updated person with id: ${person.id}`);
  } catch (err) {
    console.error("Error updating person:", err.message);
  }
};

const deletePersonById = async (id) => {
  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          id: id,
        },
      })
    );
    console.log(`Deleted person with id: ${id}`);
    return {
      TableName: tableName,
      Key: {
        id: id,
      },
    };
  } catch (err) {
    console.error("Error deleting person:", err.message);
    throw err;
  }
};

module.exports = {
  createPerson,
  getAllPeople,
  getPersonById,
  updatePerson,
  deletePersonById,
};
