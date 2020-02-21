package main

import (
	"crypto/sha256"
	"fmt"
	"log"
	"net/smtp"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type FormData struct {
	ID      string `json:"id,omitempty"`
	Time    string `json:"time,omitempty"`
	First   string `json:"fname,omitempty"`
	Last    string `json:"lname,omitempty"`
	Email   string `json:"email,omitempty"`
	Phone   string `json:"phone,omitempty"`
	Message string `json:"message,omitempty"`
}

func main() {
	lambda.Start(goWriteToDynamo)
}

var db = dynamodb.New(session.New(), aws.NewConfig().WithRegion("us-east-2"))

// Post new contact to data store
func goWriteToDynamo(ctx aws.Context, d FormData) (FormData, error) {
	log.Println("Item being added: ", d)
	if len(d.ID) < 1 {
		d.ID = fmt.Sprintf("%x", sha256.Sum224([]byte(d.First+d.Last+d.Time)))
	}
	d.Time = time.Now().String()

	testData, err := dynamodbattribute.MarshalMap(d)
	input := &dynamodb.PutItemInput{
		Item:      testData,
		TableName: aws.String("test"),
	}
	_, err = db.PutItem(input)
	if err != nil {
		log.Println("Failed to PutItem: ", err)
		return d, err
	}
	MailFormData(d)
	return d, nil
}

func MailFormData(data FormData) {
	from := data.Email
	smtpUser := os.Getenv("smtpuser")
	smtpPass := os.Getenv("smtppass")
	to := os.Getenv("mailto")
	subject := os.Getenv("subject")
	mailHost := os.Getenv("mailhost")
	smtpPort := os.Getenv("smtpport")

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: " + subject + "\n\n" +
		data.Message + "\n" +
		data.First + " " + data.Last + "\n" +
		"phone: " + data.Phone

	err := smtp.SendMail(fmt.Sprintf("%s:%s", mailHost, smtpPort), smtp.PlainAuth("", smtpUser, smtpPass, mailHost), from, []string{to}, []byte(msg))
	if err != nil {
		log.Printf("smtp error: %s", err)
		return
	}

}
