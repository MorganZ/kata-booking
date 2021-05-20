# Application de reservation 

## restore dependencies

1 - install dotnet 5.0

2 - to restore node module : run ./client/yarn

## how to test 

for api run ./apis/booking/dotnet run

for client run ./client/yarn dev

## URLS 

client : http://localhost:3000/
api : https://localhost:5001/swagger/

## stack

vite / react / .net 5.0

## generate client (non nécessaire)

install tools : brew install openapi-generator
to generate the client in ./client/
openapi-generator generate -i ../apis/Booking/booking.json -g typescript-axios -o ./clients/booking