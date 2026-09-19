# Prepwise

Online interview preparation platform built with MERN.

## Run the client

```powershell
cd client
npm install
npm run dev
```

## Run the API

1. Copy `server/.env.example` to `server/.env` and start MongoDB.
2. Install and run the API:

```powershell
cd server
npm install
npm run dev
```

The API exposes `/api/health`, `/api/dashboard`, and `/api/questions/daily`.
