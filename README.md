# serverless-api

##### UML :
![alt](UML1.png)

Root URL for the API : [Here](https://lu27xgapxh.execute-api.us-east-1.amazonaws.com/people)

Routes :

- GET /people. to get all the people.
- GET /people/{id}. to get the data for one personr beased on the ID.
- POST /people. creating a new person.
- PUT /people/{id}. updating an existing person by ID.
- DELETE /people/{id}. deleting a person from the people list based on the id

To test each rout for them you can use postman, thunder clint, CURL, etc...

- For the GET /people route:
![Alt text](image-1.png)
- For the GET /people/{id} route:
![Alt text](image-2.png)
- For the POST /people route:
![Alt text](image.png)
- For the PUT /people/{id} route:
![Alt text](image-3.png)
- For the DELETE /people/{id} route:
![Alt text](image-4.png)