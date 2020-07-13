#!/bin/bash

# Verify env file is present
if [ ! -f ./backend/.env ]; then
  echo ".env file not set"
  exit 1
fi

# Start the podcast server
docker-compose up -d redis dbpost dbmongo1 dbmongo2
