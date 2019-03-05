# aws-rest-api
Starter code to practice creating a standard RESTful API using AWS Lambda, API Gateway, DynamoDB and the Serverless Framework.

## Getting Started
### Prerequisites
* [Java](https://www.java.com/en/download/)
* [DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
* [Postman](https://www.getpostman.com/)
* An AWS Account

### Installing
```bash
# run from the root of the project
$ npm install
```

Create a `.env` file from the root of the project. Copy the following into the file:
```
AWS_ENDPOINT="http://localhost:8000"
AWS_REGION="localhost"
USERS_TABLE='users-api-dev-users'
```

## Development
### Set up DynamoDB Locally
Follow the steps below to set up DynamoDB locally for development.

1. Open a terminal window from the parent folder of this project's folder and run the following:
```bash
$ mkdir dynamodb
$ cd dynamodb
$ touch start-dynamodb.sh
```
2. Copy the following inside the newly created `start-dynamodb.sh`
```
#!/bin/sh
jar=DynamoDBLocal.jar
lib=DynamoDBLocal_lib
dynamodir=./dynamodb-local
java -Djava.library.path=$dynamodir/$lib -jar $dynamodir/$jar -sharedDb
```
3. From the root of the `dynamodb` directory run the following:
```bash
$ sh start-dynamodb.sh
```

### Populating DynamoDb
To create a new table locally and populate with mock data, run the following:
```bash
# run from the root of the project folder
$ npm run seed
```

### Running Locally
To run the project locally, be sure that the script `start-dynamodb.sh` created previously is running. Open a new terminal window and run the following:
```bash
# run from the root of the project folder
$ npm run start
```
Open Postman to test the different available routes:
- GET - `http://localhost:3000/users` (lists all available users in the DynamoDB Table)
- GET - `http://localhost:3000/user/${id}` (retrieve a single user with the provided id)
- POST - `http://localhost:3000/user/` (create a new user)
- PUT - `http://localhost:3000/user/${id}` (update an existing user)
- DELETE - `http://localhost:3000/user/${id}` (delete an existing user)

## Deployment
Deployment is done using the serverless framework. Copy the following into your local `~user/.aws/credentials` file

```
# serverless-agent
[serverless]
aws_access_key_id=your-access-key
aws_secret_access_key=your-secret-access-key
```

And then run the following:
```bash
# run from the root of the project
$ npm run deploy
```
