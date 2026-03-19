# 🎯 Unified Project Setup Guide

Your Pustakkhana project has been consolidated into a single structure. Here's how to get started:

## 📁 New Project Structure

```
pustakkhana/
├── src/
│   ├── server/              # Backend (Node.js + Express)
│   │   ├── src/
│   │   │   └── server.js    # Main server file
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── data/            # CSV files
│   │   └── package.json
│   └── client/              # Frontend (React)
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── styles/
│       │   ├── utils/
│       │   └── App.js
│       └── package.json
├── .env                     # Environment variables
└── package.json            # Root package.json
```

## 🚀 Quick Start

### 1. **Install all dependencies**
```bash
npm install
```
This will install dependencies in root, server, and client folders.

### 2. **Start development (both server and client together)**
```bash
npm run dev
```
This command will:
- Start the Node.js backend on http://localhost:5001
- Start the React development server on http://localhost:3000

That's it! Just one command to run everything.

## 📋 Other useful commands

### Individual services:
```bash
# Run only server
npm run server

# Run only client
npm run client

# Build client for production
npm run build

# Install all dependencies (if postinstall didn't work)
npm run install:all
```

## 🔧 Environment Setup

Make sure your `.env` file in the root is configured:
```
MONGODB_URI=mongodb://localhost:27017/pustakkhana
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5001
NODE_ENV=development
```

## ⚙️ How It Works

1. **Single npm run dev**: The `concurrently` package runs both server and client in parallel
2. **API Proxy**: Client requests to `/api/*` are proxied to the backend
3. **Static Serving**: In production, the server serves the built React app
4. **Unified Node Modules**: Both server and client have their own `node_modules` folders

## 🎬 First Time Setup Checklist

- [ ] Run `npm install` from root directory
- [ ] Verify `.env` file has correct MongoDB URI
- [ ] Run `npm run dev`
- [ ] Backend should start on port 5001
- [ ] Frontend should start on port 3000
- [ ] Open browser and visit http://localhost:3000

## 📝 Notes

- Don't forget to install MongoDB locally or use MongoDB Atlas (cloud)
- The old `client/` and `server/` folders are still there but not used. You can safely delete them after verifying everything works.
- React will automatically open in your browser when you run `npm run dev`

Happy coding! 🎉
