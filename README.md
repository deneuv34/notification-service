# Notification Service

## Overview

This service used for forward payment partner notification to merchant.

## How to Run

How to run this project is simple you only just need have prerequisites tools to run the project with only `node index.js`.

### API Documentation

It's included as Postman file on the root of project named `Notification Service.postman_collection.json`. You can import the file on your Postman / Insomnia client directly;

### Prerequisites

- PostgreSQL
- Nodejs v16.x or later with npm
- Docker (optional)

### Development Guide

Create `.env` file and :

```bash
cp .env.example .env
```

Run Database Migration:

```bash
npm run migrate:up
```

Install dependencies:

```bash
npm install
```

Running the service:

```bash
npm run dev
```

### Environment Variables

Available environment variable that used by this service

```bash
NODE_ENV        # node environment e.g: development / production / local

DB_HOST         # database host, default: localhost
DB_NAME         # database name
DB_USER         # database username
DB_PASS         # database password
DB_PORT         # database port number, default: 5432
APP_PORT        # app port that listen to, default: 3000

AUTH_TOKEN      # auth token that will be going used on API call/request
```

## Additional Information

### Docker Build

To build the image using docker:

```bash
docker build -t [image_name] .
```

### Troubleshooting
