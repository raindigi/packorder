# Packorder 🚀 📦

An MVP of a single page web application built on Vue & Nuxt that fetches the data from the backend that checks the files through a queue every 2 minutes for changes to the files and sends it to the postgres and mongodb databases.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
### Prerequisites

- [Node.js](https://nodejs.org/en/): JavaScript run-time and main development language.
- [npm](https://www.npmjs.com/get-npm): Node.js package manager.
- [Docker](https://www.docker.com/): Docker for deploying containers

Make sure you have Node version 12 and above as well as Docker engine 1.13.0+ installed, to check for which version you're on, open your terminal and type

```
node --version
docker -v
```


### Installing

A step by step series of examples that tell you how to get the app starting on your local machine

Clone the repo by clicking the code button on the right hand side or go to the directory of your choice and clone it with the git clone command

```bash
$ git clone git@github.com:NickSolante/packorder.git
cd packorder
```
we'll start the docker containers 
```bash
./services_up.sh
```
then start with installing dependencies on the backend and start it before proceeding to the frontend
```bash
cd backend 
npm i && npm run start
#if you want to query the backend http://localhost:8080/orders
```
now get out of the backend and start moving towards the frontend

```bash
$ cd ../
# Start application
$ npm i && npm run dev
# By default if nothing is running on the machine it will come out on localhost:3000
```
### Shutting down
```bash
#assuming your on the frontend
ctrl + c 
cd ../
docker-compose down
cd backend
ctrl + c
```

## Built With

- [Node.js](https://nodejs.org/en/): JavaScript run-time and main development language.
- [Bull](https://github.com/OptimalBits/bull): Queue manager
- [Redis](https://redis.io/): - Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker.
- [PostGres](https://www.postgresql.org/): - PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
- [MongoDB](https://www.mongodb.com/): - MongoDB is a document database, which means it stores data in JSON-like documents.
- [npm](https://www.npmjs.com/get-npm): Node.js package manager.
- [Docker](https://www.docker.com/): Docker for deploying containers
