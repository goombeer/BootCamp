package auth

import "golang.org/x/crypto/bcrypt"

func MakeHash(data string) (string, error){
	hash, err := bcrypt.GenerateFromPassword([]byte(data), bcrypt.DefaultCost)
    if err != nil {
        return "", err
	}
	
    return string(hash), err
}

func PasswordVerify(hash, pw string) error {
    return bcrypt.CompareHashAndPassword([]byte(hash), []byte(pw))
}
