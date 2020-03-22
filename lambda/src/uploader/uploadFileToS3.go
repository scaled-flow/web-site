package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

var (
	AWS_S3_REGION = os.Getenv("AWS_S3_REGION")
	AWS_S3_BUCKET = os.Getenv("AWS_S3_BUCKET")
	mySession     = connect()
)

func main() {
	lambda.Start(handleUpload)
}

func connect() *session.Session {
	mySession, err := session.NewSession(
		&aws.Config{
			Region: aws.String(AWS_S3_REGION),
		},
	)
	if err != nil {
		panic(err)
	}
	return mySession
}

func handleUpload(w http.ResponseWriter, r *http.Request) (string, error) {
	file, header, err := r.FormFile("file")
	if err != nil {
		return "", err
	}
	defer file.Close()

	filename := header.Filename

	uploader := s3manager.NewUploader(mySession)

	uploadOutput, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(AWS_S3_BUCKET),
		Key:    aws.String(filename),
		Body:   file,
	})
	if err != nil {
		return "", err
	}

	fmt.Println(uploadOutput.Location)
	fmt.Fprint(w, "Successfully uploaded to %q\n", AWS_S3_BUCKET)
	return uploadOutput.Location, nil
}
