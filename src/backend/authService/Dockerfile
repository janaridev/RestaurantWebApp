FROM golang:1.20.7-alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

ENV PORT=3000
ENV DB="host=postgres user=postgres password=postgres dbname=postgres port=5432 sslmode=disable TimeZone=Asia/Shanghai"
ENV CACHE=redis:6379
ENV CACHE_PASSWORD=eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81

COPY . .

RUN go build -o app

EXPOSE ${PORT}

# Run the Go application
CMD ["./app"]
