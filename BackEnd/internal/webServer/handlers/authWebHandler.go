package handlers

import (
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"second/internal/handlers/userHandler"
	"second/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/go-ldap/ldap/v3"
)

type AuthRequest struct {
	UUID     string
	Password string
}

type AuthResponse struct {
	Success  bool        `json:"success"`
	UserData models.User `json:"userData"`
}

func (h *Handler) Auth(c *gin.Context) {
	var arq AuthRequest
	var user models.User

	if err := c.BindJSON(&arq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	res := Authenticate(arq.UUID, arq.Password)
	if res {
		user = models.User{
			UUID:     arq.UUID,
			Password: arq.Password,
			IsAdmin:  false,
		}

		if userHandler.CreateUser(&user, h.DB) != nil {
			log.Printf("Такой пользователь уже существует: %s", user.UUID)
		}

		c.JSON(http.StatusOK, AuthResponse{
			Success:  true,
			UserData: user,
		})
	} else {
		c.JSON(http.StatusBadRequest, AuthResponse{
			Success:  false,
			UserData: models.User{},
		})
	}
}

func Authenticate(username, password string) bool {
	ldapURL := "ldap://10.3.0.33:389"
	baseDN := "ou=People,dc=it-college,dc=ru"

	l, err := ldap.DialURL(ldapURL)
	if err != nil {
		log.Printf("не удалось подключиться к LDAP-серверу: %s", err)
		return false
	}
	defer l.Close()

	err = l.StartTLS(&tls.Config{InsecureSkipVerify: true})
	if err != nil {
		log.Printf("не удалось установить TLS-соединение: %s", err)
		return false
	}

	searchRequest := ldap.NewSearchRequest(
		baseDN,
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,
		0,
		false,
		fmt.Sprintf("(uid=%s)", username),
		[]string{"dn"},
		nil,
	)

	searchResult, err := l.Search(searchRequest)
	if err != nil {
		log.Printf("ошибка поиска пользователя: %s", err)
		return false
	}

	if len(searchResult.Entries) == 0 {
		log.Printf("пользователь %s не найден", username)
		return false
	}

	userDN := searchResult.Entries[0].DN

	err = l.Bind(userDN, password)
	if err != nil {
		log.Printf("ошибка аутентификации: %s", err)
		return false
	}

	return true
}
