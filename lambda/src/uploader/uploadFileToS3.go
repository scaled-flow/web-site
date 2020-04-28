package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

var (
	region         = os.Getenv("AWS_S3_REGION")
	bucket         = os.Getenv("AWS_S3_BUCKET")
	mySession      = connect()
	allowedBuckets = []string{"sf-consultants", "sf-blog", "www.testscaledflow.com"}
)

func isAllowed(bucket string) bool {
	allowed := false
	for _, b := range allowedBuckets {
		if b == bucket {
			allowed = true
		}
	}
	return allowed
}

func main() {
	lambda.Start(createPresignedURL)
}

func connect() *session.Session {
	mySession, err := session.NewSession(
		&aws.Config{
			Region: aws.String(region),
		},
	)
	if err != nil {
		panic(err)
	}
	return mySession
}

func createPresignedURL(context context.Context, r events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	resp := events.APIGatewayProxyResponse{}
	myKey := r.Headers["key"]
	if len(myKey) < 1 {
		myKey = "testFile.txt"
	}
	if len(r.Headers["bucket"]) > 0 {
		receivedBucket := r.Headers["bucket"]
		if isAllowed((bucket)) {
			bucket = receivedBucket
		}
	}
	myS3Service := s3.New(mySession)
	req, _ := myS3Service.PutObjectRequest(&s3.PutObjectInput{
		Bucket:           aws.String(bucket),
		Key:              aws.String(myKey),
		GrantFullControl: aws.String("GrantFullControl"),
	})

	str, header, err := req.PresignRequest(15 * time.Minute)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       err.Error(),
			StatusCode: 503,
		}, err
	}
	log.Println("HEADER: ", header)

	resp.Body = str
	resp.StatusCode = 200
	resp.Headers = map[string]string{"Access-Control-Allow-Origin": "*", "Content-Type": "string"}
	return resp, nil
}
