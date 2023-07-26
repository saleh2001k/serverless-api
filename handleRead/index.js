const dynamoose = require("dynamoose");

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});

const PersonModel = dynamoose.model("people", peopleSchema);

exports.handler = async function (event, context) {
  const { routeKey, pathParameters } = event;
  let statusCode = 200;
  let responseBody;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    if (routeKey === "GET /people/{id}") {
      const { id } = pathParameters;
      const getUser = await PersonModel.get(id);
      responseBody = getUser;
    } else if (routeKey === "GET /people") {
      const getUser = await PersonModel.scan().exec();
      responseBody = getUser;
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
