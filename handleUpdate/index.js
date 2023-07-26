"use strict";
const dynamoose = require("dynamoose");

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});
const person = dynamoose.model("people", peopleSchema);

exports.handler = async function (event, context) {
  const { routeKey, body: requestBody, pathParameters } = event;
  let statusCode = 200;
  let responseBody;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    if (routeKey === "PUT /people") {
      const updatedPerson = await person.update(requestBody);
      responseBody = updatedPerson;
    } else {
      statusCode = 404;
      responseBody = { error: "Not found" };
    }
  } catch (err) {
    statusCode = 400;
    responseBody = { error: err.message };
  } finally {
    if (routeKey === "PUT /people" && pathParameters && pathParameters.id) {
      responseBody.message = `Updated person with id: ${pathParameters.id}`;
    }
    body = JSON.stringify(responseBody);
  }

  console.log(body);
  return {
    body,
    statusCode,
    headers,
  };
};
