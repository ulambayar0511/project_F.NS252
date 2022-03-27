const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();
const cors = require('cors')
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());
app.use(cors())
function uuidv4() {
    function random() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return random() + random() + '-' + random() + '-' + random() + '-' +
      random() + '-' + random() + random() + random();
  }
app.get("/users/:userId", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

app.post("/login", async function (req, res) {
    const { email ,password } = req.body;
    const params = {
        TableName: USERS_TABLE,
        ExpressionAttributeNames: {
            "#email": "email",
            "#password": "password",
        },
        ExpressionAttributeValues: {
            ":email": email,
            ":password": password,
        },
        FilterExpression: "#email = :email and #password = :password"

      };
  

      try {
        const {Items} = await dynamoDbClient.scan(params).promise();
        console.log(Items)
        if (Items && Items.length > 0) {
          const { email, password } = Items[0];
          res.json({ email, password });
        } else {
          res
            .status(404)
            .json({ error: 'not found user' });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not retreive user" });
      }
  });

  
app.post("/users", async function (req, res) {
  const { email,password } = req.body;
  if (typeof email !== "string") {
    res.status(400).json({ error: '"email" must be a string' });
  } else if (typeof password !== "string") {
    res.status(400).json({ error: '"password" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: uuidv4(),
      email: email,
      password: password
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({ email, password });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
