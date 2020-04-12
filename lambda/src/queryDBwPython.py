import os
import json

import boto3

dynamodb = boto3.resource('dynamodb')

def get(event, context):
    table = dynamodb.Table('test')
    print(event)

    result = table.get_item(
        Key={'id':event['pathParameters']['id']}
        )

    if(event['secretKey'] == os.getenv(SCALED_FLOW_HEADER)):
        response = {
            "statusCode": 200,
            "body": json.dumps(result)
        }
    else: 
        response = {
            "statusCode": 400
        }

    return response
