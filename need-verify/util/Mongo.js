'use strict';

const mongoose = require('mongoose');
const logger = require('./logger');

function closeConnection() {
  mongoose.connection.close();
}

function init(mongoUrl, callback = () => {}) {
  // Set mongoose.Promise to any Promise implementation
  mongoose.Promise = global.Promise;

  // Makes connection asynchronously,
  // Mongoose will queue up database operations and release them when the connection is complete.
  mongoose.connect(mongoUrl, { useNewUrlParser: true },
    function (err, res) {
      if (err) {
        logger.error('ERROR connecting to MongoDB:' + mongoUrl + '. ' + err);
      }

      logger.info('Succeeded connected to MongoDB:' + mongoUrl);
      callback();
    });
}

exports.closeConnection = closeConnection;
exports.init = init;
