# Sleeper Backend

Welcome to the Sleeper Backend repository! This project serves as the backend for the Sleeper mobile application, providing the necessary APIs and server functionality.

## How to Replicate?

Follow the steps below to replicate the Sleeper Backend on your local machine.

### 1. Clone this Repository

```bash
git clone https://github.com/HackFest2024-Sleeper/sleeper-backend.git
cd sleeper-backend
```

### 2. Installing dependencies

```bash
npm install
```

### 3. Create your local PostgreSQL database and add the information to .env file based on .env.example

### 4. Migrate the table to the created database

```bash
sequelize db:migrate
```

### 5. Run the server

```bash
npm run dev
```

### Server will run on your designated port / 9000

## Only want to test our API? 

You can use our deployed API below!
```bash
https://sleeper-api-n4waezcoha-et.a.run.app
```
API Documentation is in progress!
