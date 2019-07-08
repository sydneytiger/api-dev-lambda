'use strict'
const AWS = require('aws-sdk');
const region = 'ap-southeast-2';
const dynamodb = new AWS.DynamoDB({ region, apiVersion: '2012-08-10' });

exports.handler = function (event, context, callback) {
  if (event.userId) {
    const params = {
      ExpressionAttributeNames: {
        '#age': 'Age',
        '#married': 'Married',
        '#name': 'Name'
      },
      ExpressionAttributeValues: {
        ':a': { N: event.age },
        ':m': { BOOL: event.married },
        ':n': { S: event.name }
      },
      Key: {
        'UserId': { S: event.userId }
      },
      TableName: 'TodoList',
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'SET #age = :a, #married = :m, #name = :n'
    }

    dynamodb.updateItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } else {
    callback('user id required');
  }
}