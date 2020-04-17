const express = require('express');
const logger = require('./util/logger');
const MongoDb = require("./util/Mongo");

MongoDb.init(process.env.MONGO_URL);

const app = express();
app.set("port", 3000);

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', require('./routes/api'));


app.listen(app.get("port"), function() {
  logger.info("App is running on port " + app.get("port"));
});