package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type expense struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Amount      float32   `json:"amount"`
	ExpenseDate time.Time `json:"expenseDate"`
}

var expenses = []expense{
	{ID: "1", Title: "test title 1", Amount: 100, ExpenseDate: time.Now()},
	{ID: "2", Title: "test title 2", Amount: 200, ExpenseDate: time.Now()},
	{ID: "3", Title: "test title 3", Amount: 300, ExpenseDate: time.Now()},
}

func getExpenses(context *gin.Context) {
	context.IndentedJSON(http.StatusOK, expenses)
}

func createExpense(context *gin.Context) {
	var newExpense expense

	if error := context.BindJSON(&newExpense); error != nil {
		return
	}

	expenses = append(expenses, newExpense)

	context.IndentedJSON(http.StatusCreated, newExpense)
}

func main() {
	router := gin.Default()

	router.GET("/expenses", getExpenses)
	router.POST("expenses", createExpense)

	router.Run("localhost:9090")
}
