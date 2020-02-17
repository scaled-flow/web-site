const AWS = require(`aws-sdk`);
AWS.config.update({region: `us-east-2`});
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    const TableName = "sf0-15";
    const Key = {};
    Key["test"] = "one";

    dynamo.get({TableName, Key}, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            var response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    'Access-Control-Allow-Origin': `*`,
                },
                body: JSON.stringify(data.Item),
                isBase64Encoded: false
            };
            callback(null, response);
        }
    });
};