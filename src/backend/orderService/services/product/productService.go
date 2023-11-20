package product

import (
	"encoding/json"
	"fmt"
	"net/http"
	"orderService/dtos/product"
	"orderService/responses"
	"os"
)

func GetAllProducts() ([]product.ProductDto, error) {
	responseChan := make(chan *http.Response)
	errorChan := make(chan error)

	go func() {
		resp, err := http.Get(os.Getenv("PRODUCT_SERVICE_URL"))
		if err != nil {
			errorChan <- err
			return
		}
		responseChan <- resp
	}()

	select {
	case resp := <-responseChan:
		defer resp.Body.Close()

		fmt.Println("Response status:", resp.Status)

		var apiResponse responses.ProductServiceApiResponse

		err := json.NewDecoder(resp.Body).Decode(&apiResponse)
		if err != nil {
			return nil, err
		}

		return apiResponse.Result, nil

	case err := <-errorChan:
		return nil, err
	}
}
