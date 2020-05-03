package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/lib/pq"
)

type TransactionData struct {
	TotalPrice float64 `json:"totalPrice"`
	Attendees  []struct {
		ID    int    `json:"id"`
		FName string `json:"fName"`
		LName string `json:"lName"`
		Email string `json:"email"`
	} `json:"attendees"`
	NumOfAttendees int     `json:"numOfAttendees"`
	PricePerPerson float64 `json:"pricePerPerson"`
	Purchaser      struct {
		ID         int    `json:"purchaser_id"`
		FirstName  string `json:"first_name"`
		LastName   string `json:"last_name"`
		Company    string `json:"company"`
		Address1   string `json:"address_1"`
		Address2   string `json:"address_2"`
		City       string `json:"city"`
		State      string `json:"state"`
		PostalCode string `json:"postal_code"`
		Country    string `json:"country"`
		Email      string `json:"email"`
		ReferredBy string `json:"referredBy"`
	} `json:"purchaser"`
	NumOfDays       int `json:"numOfDays"`
	ClassScheduleID int `json:"classScheduleId"`
}

func main() {
	lambda.Start(addAttendees)
}

func addAttendees(event events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	log.Println("IN THE HANDLER")
	log.Println(string(event.Body))

	dbname := os.Getenv("postgres_db_name")
	dbhost := os.Getenv("postgres_host")
	dbport := os.Getenv("postgres_port")
	dbuser := os.Getenv("postgres_user")
	dbpass := os.Getenv("postgres_user_pass")

	dbinfo := fmt.Sprintf("host=%s dbname=%s user=%s password=%s port=%s sslmode=disable", dbhost, dbname, dbuser, dbpass, dbport)
	db, err := sql.Open("postgres", dbinfo)

	var head bool
	head = false
	log.Println("Headers:")
	for key, value := range event.Headers {
		if key == "sfHeader" {
			head = true
		}
		log.Println("%s: %s", key, value)
	}

	if head != true {
		//err = i really am not sure so I did it in a questionable way	
		return &events.APIGatewayProxyResponse{StatusCode: 502, Body: fmt.Sprintf("You're not my real dad")}, nil
	}

	if err != nil {
		log.Println("Unable to connect to database")
	}
	defer db.Close()
	transaction := &TransactionData{}
	err = json.Unmarshal([]byte(event.Body), transaction)
	if err != nil {
		return &events.APIGatewayProxyResponse{StatusCode: 502, Body: fmt.Sprintf("{status:\"Unable to parse the input\",error: \"%s\"}", err.Error())}, nil
	}

	purchaser := db.QueryRow(
		"insert into purchasers (first_name,last_name,company,address_1,address_2,city,state_region,postal_code,email,total_purchase_amount) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning purchaser_id;",
		transaction.Purchaser.FirstName, transaction.Purchaser.LastName, transaction.Purchaser.Company, transaction.Purchaser.Address1, transaction.Purchaser.Address2, transaction.Purchaser.City, transaction.Purchaser.State,
		transaction.Purchaser.PostalCode, transaction.Purchaser.Email, transaction.TotalPrice)

	err = purchaser.Scan(&transaction.Purchaser.ID)
	if err != nil {
		log.Println("errored out scanning purchaser id: ", err)
		return nil, err
	}

	for i, attendee := range transaction.Attendees {
		err := db.QueryRow("insert into attendees (first_name,last_name,email) values ($1, $2, $3) returning attendee_id;", attendee.FName, attendee.LName, attendee.Email).Scan(&attendee.ID)
		if err != nil {
			return nil, err
		}
		transaction.Attendees[i].ID = attendee.ID
		var last int
		err = db.QueryRow("insert into attendees_link_purchasers_link_class_schedules (attendee_id_fk,purchaser_id_fk,class_schedules_fk) values ($1, $2, $3) returning attendees_link_purchasers_link_class_schedules_id;", attendee.ID, transaction.Purchaser.ID, transaction.ClassScheduleID).Scan(&last)
		if err != nil {
			return nil, err
		}
	}

	transactionData, _ := json.Marshal(transaction)
	return &events.APIGatewayProxyResponse{StatusCode: 200, Headers: map[string]string{"Access-Control-Allow-Origin": "*"}, Body: string(transactionData)}, nil

}
