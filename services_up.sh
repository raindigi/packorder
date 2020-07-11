#!/bin/bash

# Verify env file is present
if [ ! -f ./app/.env ]; then
  echo ".env file not set"
  exit 1
fi

# Start the podcast server
docker-compose up -d redis dbpost dbmongo
