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
	lambda.Start(getClassSchedules)
}

// Quick first draft of Consultant Profiles with associated Classes with associated Schedules.

type ConsultantClassProfile struct {
	ClassProfileID                  int     `db:"class_profile_id_fk",json:"class_profile_id_fk"`
	ClassScheduleID                 int     `db:"class_schedule_id_fk",json:"class_schedule_id_fk"`
	FirstName                       string  `db:"first_name",json:"first_name"`
	LastName                        string  `db:"last_name",json:"last_name"`
	JobTitle                        string  `db:"job_title",json:"job_title"`
	ProfileDescription              string  `db:"profile_description",json:"profile_description"`
	ProfilePhotoURL                 string  `db:"profile_photo_url,omitempty",json:"profile_photo_url"`
	Phone                           string  `db:"phone,omitempty",json:"phone"`
	Email                           string  `db:"email,omitempty",json:"email"`
	ClassTypeFullName               string  `db:"class_type_full_name,omitempty",json:"class_type_full_name"`
	ClassTypeAbbreviation           string  `db:"class_type_abbreviation,omitempty",json:"class_type_abbreviation"`
	ClassTitle                      string  `db:"class_title",json:"class_title"`
	ClassDescription                string  `db:"class_desc",json:"class_desc"`
	ClassImage                      string  `db:"class_image",json:"class_image"`
	ClassEarlyBirdPriceReduction    float64 `db:"class_early_bird_price_reduction,omitempty",json:"class_early_bird_price_reduction"`
	ClassGroupPriceReductionPercent int     `db:"class_group_price_reduction_percent,omitempty",json:"class_group_price_reduction_percent"`
	ClassInPersonStandardPrice      float64 `db:"class_in_person_standard_price,omitempty",json:"class_in_person_standard_price"`
	ClassOnlineStandardPrice        float64 `db:"class_online_standard_price,omitempty",json:"class_online_standard_price"`
	CurrencyTypeFullName            string  `db:"currency_type_full_name,omitempty",json:"currency_type_full_name"`
	CurrencyTypeAbbreviation        string  `db:"currency_type_abbreviation,omitempty",json:"currency_type_abbreviation"`
	ClassIsInPerson                 bool    `db:"class_is_in_person,omitempty",json:"class_is_in_person"`
	ClassInPersonAddress01          string  `db:"class_in_person_address_01,omitempty",json:"class_in_person_address_01"`
	ClassInPersonAddress02          string  `db:"class_in_person_address_02,omitempty",json:"class_in_person_address_02"`
	ClassInPersonCity               string  `db:"class_in_person_city,omitempty",json:"class_in_person_city"`
	ClassInPersonState              string  `db:"class_in_person_state,omitempty",json:"class_in_person_state"`
	ClassInPersonZip                string  `db:"class_in_person_zip,omitempty",json:"class_in_person_zip"`
	ClassIsOnline                   bool    `db:"class_is_online,omitempty",json:"class_is_online"`
	ClassOnlineLink                 string  `db:"class_online_link,omitempty",json:"class_online_link"`
	ClassNumberOfDays               string  `db:"class_number_of_days,omitempty",json:"class_number_of_days"`
	ClassStartDate                  string  `db:"class_start_date,omitempty",json:"class_start_date"`
	ClassEndDate                    string  `db:"class_end_date,omitempty",json:"class_end_date"`
	ClassStartTime                  string  `db:"class_start_time,omitempty",json:"class_start_time"`
	ClassEndTime                    string  `db:"class_end_time,omitempty",json:"class_end_time,omitempty"`
}

func getClassSchedules() (events.APIGatewayProxyResponse, error) {
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
	rows, err := db.Query("select * from class_consultant_schedule_view;")
	if err != nil {
		log.Println("Unable to query the table")
	}

	ConsultantClassProfiles := []ConsultantClassProfile{}
	for rows.Next() {
		var row ConsultantClassProfile
		err := rows.Scan(
			&row.ClassProfileID,
			&row.ClassScheduleID,
			&row.FirstName,
			&row.LastName,
			&row.JobTitle,
			&row.ProfileDescription,
			&row.ProfilePhotoURL,
			&row.Phone,
			&row.Email,
			&row.ClassTypeFullName,
			&row.ClassTypeAbbreviation,
			&row.ClassTitle,
			&row.ClassDescription,
			&row.ClassImage,
			&row.ClassEarlyBirdPriceReduction,
			&row.ClassGroupPriceReductionPercent,
			&row.ClassInPersonStandardPrice,
			&row.ClassOnlineStandardPrice,
			&row.CurrencyTypeFullName,
			&row.CurrencyTypeAbbreviation,
			&row.ClassIsInPerson,
			&row.ClassInPersonAddress01,
			&row.ClassInPersonAddress02,
			&row.ClassInPersonCity,
			&row.ClassInPersonState,
			&row.ClassInPersonZip,
			&row.ClassIsOnline,
			&row.ClassOnlineLink,
			&row.ClassNumberOfDays,
			&row.ClassStartDate,
			&row.ClassEndDate,
			&row.ClassStartTime,
			&row.ClassEndTime)
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
