'use strict'
const AWS = require('aws-sdk');
const region = 'ap-southeast-2';
const dynamodb = new AWS.DynamoDB({ region, apiVersion: '2012-08-10' });

exports.handler = function (event, context, callback) {
  if (event.userId) {
    var params = {
      TableName: 'TodoList',
      Key: {
        UserId: { S: event.userId }
      }
    };

    dynamodb.deleteItem(params, (err) => {
      if (err) {
        console.log(err, err.stack);
        callback(err);
      } else {
        callback(null, `${event.userId} is deleted`);
      }
    });
  } else {
    callback('user id required');
  }
}