const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const logger = require('./util/logger');
const MongoDb = require("./util/Mongo");

MongoDb.init(process.env.MONGO_URL);

const app = express();
app.set("port", 3000);
app.use(bodyParser.urlencoded({ extended : true, limit : "50mb" })); // Use the body-parser package in our application
app.use(bodyParser.json({ limit : "50mb" }));

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', require('./routes/api'));
app.use(cors());

app.listen(app.get("port"), function() {
  logger.info("App is running on port " + app.get("port"));
});