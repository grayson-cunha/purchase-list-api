# Purchase List API

<p align="center">
<img src="https://cdn-icons-png.flaticon.com/512/5087/5087847.png" width=256 height=256>
</p>

This project was created for me to practice what I have learned doing a course on Udemy about NestJS.

The main goal of the project is to allow users to import products from invoices when they do the supermarket.

Doing that allow the user to simulate a purchase list whe they need to do the supermarket because not all supermarkets has a ecommerce and it could help the people to have more control in how much they can spend.

## How it works?

When you do the supermarket you receive a invoice with a number with this number you can consult the products bought in the following link [Search NFCe](https://portalsped.fazenda.mg.gov.br/portalnfce/sistema/consultaarg.xhtml).

At the moment you has to copy the table in another csv to import at the system, but it can be improved.

## How to start?

To start the application there the comands below:

- start: "nest start",
- start:dev: "nest start --watch",
- start:debug: "nest start --debug --watch",

## How to run the tests?

test:e2e: "jest --config ./test/jest-e2e.json"

## Documentation [Work in Progress]

To access the documentation of the api use the link `localhost:3000/documentation` after start the app.

## Stack

- NestJS
- Jest
- TypeOrm
- Postgres
- XLSX
