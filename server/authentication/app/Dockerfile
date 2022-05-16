FROM golang:1.18 AS build

WORKDIR /app/
COPY . .
CMD chmod +x script.sh && ./script.sh

ENV DB_HOST=127.0.0.1
ENV DB_PORT=3306
ENV DB_USER=admin
ENV DB_PASSWORD=P@ssw0rd
ENV DB_NAME=auth-service

RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o app .

FROM alpine:latest
WORKDIR /app/

COPY --from=build /app/ /app/

EXPOSE 8080

ENTRYPOINT ["/app/app"]