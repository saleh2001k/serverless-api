const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand, DeleteCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const dynamoose = require("dynamoose");

let client = new DynamoDBClient({});
let dynamo = DynamoDBDocumentClient.from(client)
let table = 'people'

const personSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const Person = dynamoose.model("people", personSchema);

export const handleDelete = async (event) => {
  try {
    await Person.delete(event.pathParameters.id);
    return {
      statusCode: 204,
      body: `Deleted people: ${event.pathParameters.id}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: err.message,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};
