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

func main() {
	lambda.Start(queryClassesFromRDS)
}

type ConsultantClassProfile struct {
	ConstultantID                   int     `db:"consultant_profile_id_fk",json:"consultant_profile_id"`
	ClassID                         int     `db:"class_profile_id_fk"`
	ConsultantProfileUserID         int     `db:"consultant_profile_user_id"`
	FirstName                       string  `db:"first_name"`
	LastName                        string  `db:"last_name"`
	JobTitle                        string  `db:"job_title"`
	ProfileDescription              string  `db:"profile_description"`
	ProfilePhotoURL                 string  `db:"profile_photo_url,omitempty"`
	Phone                           string  `db:"phone,omitempty"`
	Email                           string  `db:"email,omitempty"`
	ClassProfileID                  int     `db:"class_profile_id"`
	ClassTypeID                     int     `db:"class_type_id"`
	ClassTypeFullName               string  `db:"class_type_full_name,omitempty"`
	ClassTypeAbbreviation           string  `db:"class_type_abbreviation,omitempty"`
	ClassTitle                      string  `db:"class_title"`
	ClassDescription                string  `db:"class_desc"`
	ClassImage                      string  `db:"class_image"`
	ClassEarlyBirdPriceReduction    float64 `db:"class_early_bird_price_reduction,omitempty"`
	ClassGroupPriceReductionPercent int     `db:"class_group_price_reduction_percent,omitempty"`
	ClassInPersonStandardPrice      float64 `db:"class_in_person_standard_price,omitempty"`
	ClassOnlineStandardPrice        float64 `db:"class_online_standard_price,omitempty"`
	ClassCurrencyTypeID             int     `db:"class_currencty_type_fk,omitempty"`
	CurrencyTypeFullName            string  `db:"currency_type_full_name,omitempty"`
	CurrencyTypeAbbreviation        string  `db:"currency_type_abbreviation,omitempty"`
}

func queryClassesFromRDS() (events.APIGatewayProxyResponse, error) {
	dbname := os.Getenv("postgres_db_name")
	dbhost := os.Getenv("postgres_host")
	dbport := os.Getenv("postgres_port")
	dbuser := os.Getenv("postgres_user")
	dbpass := os.Getenv("postgres_user_pass")
	dbinfo := fmt.Sprintf("host=%s dbname=%s user=%s password=%s port=%s sslmode=disable", dbhost, dbname, dbuser, dbpass, dbport)
	db, err := sql.Open("postgres", dbinfo)
	if err != nil {
		log.Println("Unable to connect to database")
	}
	rows, err := db.Query("select * from consultant_profiles_link_class_profiles_view;")
	if err != nil {
		log.Println("Unable to query the table")
	}

	ConsultantClassProfiles := []ConsultantClassProfile{}
	for rows.Next() {
		var row ConsultantClassProfile
		err := rows.Scan(
			&row.ConstultantID,
			&row.ClassID,
			&row.ConsultantProfileUserID,
			&row.FirstName,
			&row.LastName,
			&row.JobTitle,
			&row.ProfileDescription,
			&row.ProfilePhotoURL,
			&row.Phone,
			&row.Email,
			&row.ClassProfileID,
			&row.ClassTypeID,
			&row.ClassTypeFullName,
			&row.ClassTypeAbbreviation,
			&row.ClassTitle,
			&row.ClassDescription,
			&row.ClassImage,
			&row.ClassEarlyBirdPriceReduction,
			&row.ClassGroupPriceReductionPercent,
			&row.ClassInPersonStandardPrice,
			&row.ClassOnlineStandardPrice,
			&row.ClassCurrencyTypeID,
			&row.CurrencyTypeFullName,
			&row.CurrencyTypeAbbreviation)
		if err != nil {
			return events.APIGatewayProxyResponse{StatusCode: 204, Body: err.Error()}, err
		}
		ConsultantClassProfiles = append(ConsultantClassProfiles, row)
	}

	resultBody, err := json.Marshal(ConsultantClassProfiles)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 204, Body: err.Error()}, err
	}
	return events.APIGatewayProxyResponse{StatusCode: 200, Headers: map[string]string{"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}, Body: string(resultBody)}, nil
}
