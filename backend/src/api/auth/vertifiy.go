package auth

import (
	"errors"
	"github.com/BurntSushi/toml"

	"log"
	_ "github.com/BurntSushi/toml"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
)

type Config struct {
	AWS AwsConfig `toml:"aws"`
}

type AwsConfig struct {
	AwsSecretKey   string `toml:"aws_secret_key"`
	AwsAccessKeyID string `toml:"aws_access_key_id"`
	AwsRegion      string `toml:"aws_region"`
	AwsSesEndpoint string `toml:"aws_ses_endpoint"`
}


func SendMail(from string, to string, title string, body string) error {
	var config Config
	_, err := toml.DecodeFile("./config.toml", &config)
	if err != nil {
		panic(err)
	}

	awsSession := session.New(&aws.Config{
		Region:      aws.String(config.AWS.AwsRegion),
		Credentials: credentials.NewStaticCredentials(config.AWS.AwsAccessKeyID, config.AWS.AwsSecretKey, ""),
	})

	svc := ses.New(awsSession)
	input := &ses.SendEmailInput{
		Destination: &ses.Destination{
			ToAddresses: []*string{
				aws.String(to),
			},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Text: &ses.Content{
					Charset: aws.String("UTF-8"),
					Data:    aws.String(body),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String("UTF-8"),
				Data:    aws.String(title),
			},
		},
		Source: aws.String(from),
	}
	_, err = svc.SendEmail(input)
	if err != nil {
		log.Println(err)
		return errors.New(err.Error())
	}
	return nil
}