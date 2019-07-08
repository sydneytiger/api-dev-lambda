'use strict'
const AWS = require('aws-sdk');
const region = 'ap-southeast-2';
const dynamodb = new AWS.DynamoDB({ region, apiVersion: '2012-08-10' });

exports.handler = (event, context, callback) => {
  const userId = `user_${Math.random()}`;
  const params = {
    Item: {
      'UserId': { S: userId },
      'Name': { S: event.name },
      'Gender': { S: event.gender }
    },
    TableName: 'TodoList'
  }

  dynamodb.putItem(params, function (err) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, { userId });
    }

  });
};
