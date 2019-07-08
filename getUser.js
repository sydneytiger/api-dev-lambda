const AWS = require('aws-sdk');
const region = 'ap-southeast-2';
const documentClient = new AWS.DynamoDB.DocumentClient({ region });

exports.handler = (event, context, callback) => {
  if (event.userId) {
    const params = {
      TableName: 'TodoList',
      Key: {
        UserId: event.userId
      }
    }

    documentClient.get(params, (err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, data);
      }
    })
  } else {
    documentClient.scan({ TableName: 'TodoList' }, (err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }
};


// const getAllUser = () => {
//     return new Promise((resolve, reject) => {
//         dynamodb.scan({TableName: 'TodoList'}, function(err, data){
//             if(err){
//                 console.log(err);
//                 reject(err);
//             }else{
//                 const items = data.Items.map(dataField => { 
//                     return {Id: dataField.UserId.S,
//                     Name: dataField.Name.S,
//                     Gender: dataField.Gender.S}
//                 });
//                 resolve(items);
//             }
//         });
//     });
// };
