const dynamoose = require("dynamoose");

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});

const PersonModel = dynamoose.model("people", peopleSchema);

exports.handler = async function (event, context) {
  const { routeKey, body: requestBody } = event;
  let statusCode = 200;
  let responseBody;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    if (routeKey === "POST /people") {
      const newPerson = await PersonModel.create(requestBody);
      responseBody = `Created new person with id: ${newPerson.id}`;
      statusCode = 201;
    } else {
      statusCode = 404;
      responseBody = { error: "Not found" };
    }
  } catch (err) {
    statusCode = 400;
    responseBody = { error: err.message };
  }

  return {
    statusCode,
    body: JSON.stringify(responseBody),
    headers,
  };
};
