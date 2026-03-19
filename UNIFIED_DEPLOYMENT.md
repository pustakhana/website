# 🚀 Unified Deployment Guide - Single Platform

Everything is now **one single deployment** - frontend + backend + API on the same server.

---

## Architecture

```
┌─────────────────────────────────────────┐
│    Heroku/Railway/Vercel/Render        │
│  https://your-app.herokuapp.com         │
│                                         │
│  ├── Express Server (Backend)           │
│  │   ├── /api/books                    │
│  │   ├── /api/orders                   │
│  │   └── /api/auth                     │
│  │                                      │
│  ├── React App (Frontend)               │
│  │   ├── /books                         │
│  │   ├── /cart                          │
│  │   └── /orders                        │
│  │                                      │
│  └── MongoDB Connection                 │
│      (MongoDB Atlas)                    │
└─────────────────────────────────────────┘
```

**Everything runs on ONE platform. No separate deployments needed.**

---

## ✅ How It Works

1. **Server** builds the React frontend during deployment
2. **Express** serves the built React files as static assets
3. **API routes** (`/api/*`) are handled by Express
4. **All other routes** are served React's `index.html` (React Router handles them)

---

## 🚀 Deploy to Heroku (Recommended - Free)

### Step 1: Install Heroku CLI
```bash
brew tap heroku/brew && brew install heroku
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
cd /Users/dhruvawani17/Documents/pustakkhana
heroku create pustakkhana-app
```

### Step 4: Set Environment Variables
```bash
heroku config:set MONGODB_URI="your-mongodb-connection-string" -a pustakkhana-app
heroku config:set JWT_SECRET="your-very-secure-secret-key" -a pustakkhana-app
heroku config:set NODE_ENV="production" -a pustakkhana-app
```

### Step 5: Deploy
```bash
git push heroku main
```

**Done!** Your app is live at: `https://pustakkhana-app.herokuapp.com`

---

## 🚀 Deploy to Railway.app

### Step 1: Create Account
Go to https://railway.app and sign up

### Step 2: Connect GitHub
- Click "New Project"
- Select "Deploy from GitHub"
- Choose your repository

### Step 3: Set Environment Variables
In Railway dashboard:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your secret key
- `NODE_ENV`: `production`

### Step 4: Deploy
Railway auto-deploys on GitHub push

**Your app is live at:** Railway-assigned URL

---

## 🚀 Deploy to Vercel

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
cd /Users/dhruvawani17/Documents/pustakkhana
vercel
```

### Step 3: Set Environment Variables
In Vercel Dashboard:
- Add `MONGODB_URI`
- Add `JWT_SECRET`

**Your app is live at:** `https://your-project.vercel.app`

---

## 🚀 Deploy to Render

### Step 1: Create Account
Go to https://render.com and sign up

### Step 2: Create Web Service
- New → Web Service
- Connect GitHub repo
- Select branch: `main`

### Step 3: Configure
- **Build Command:** `npm install && cd client && npm install && npm run build`
- **Start Command:** `cd server && npm start`
- **Environment:** Node
- Add environment variables:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `NODE_ENV=production`

### Step 4: Deploy
Click "Deploy" and wait (takes ~5 min)

**Your app is live at:** Render-assigned URL

---

## 📊 MongoDB Atlas Setup (Free Database)

### Step 1: Create Account
Go to https://www.mongodb.com/cloud/atlas

### Step 2: Create Cluster
- Free tier (512 MB)
- Select region closest to you

### Step 3: Get Connection String
- Click "Connect"
- Choose "Connect your application"
- Copy connection string:
  ```
  mongodb+srv://username:password@cluster.mongodb.net/pustakkhana?retryWrites=true&w=majority
  ```

### Step 4: Set on Your Platform
```bash
# For Heroku
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/pustakkhana?retryWrites=true&w=majority" -a pustakkhana-app
```

---

## 🧪 Test After Deployment

### Test 1: Backend Health
```bash
curl https://your-app-url.com/health
```
Should return:
```json
{"status":"OK","message":"Server is running"}
```

### Test 2: Get Books
```bash
curl https://your-app-url.com/api/books?limit=1
```
Should return JSON with books

### Test 3: Open in Browser
Go to `https://your-app-url.com` in browser

Should see:
- ✅ Book catalog loads
- ✅ Books display
- ✅ Add to cart works
- ✅ No 404 errors
- ✅ Navigation works

---

## 📋 Deployment Checklist

- [ ] MongoDB Atlas account created & connection string obtained
- [ ] Environment variables ready:
  - `MONGODB_URI`
  - `JWT_SECRET`
- [ ] Git repository up to date with latest changes
- [ ] Platform account created (Heroku/Railway/Render/Vercel)
- [ ] App created on platform
- [ ] Environment variables set on platform
- [ ] Deployment command executed
- [ ] App deployed successfully (check logs)
- [ ] Frontend loads: app loads at home URL
- [ ] API works: `/health` endpoint responds
- [ ] Books display: catalog loads 955 books
- [ ] Add to cart: button works
- [ ] Navigation: routes work without 404s
- [ ] Orders: can place and view orders

---

## 🔗 Final URLs (After Deployment)

Pick ONE platform and your URLs will be:

### If Using Heroku:
- **Frontend:** `https://pustakkhana-app.herokuapp.com`
- **Backend API:** `https://pustakkhana-app.herokuapp.com/api`
- **GitHub:** `https://github.com/pustakhana/website`

### If Using Railway:
- **Frontend:** `https://railway-assigned-url.railway.app`
- **Backend API:** `https://railway-assigned-url.railway.app/api`

### If Using Render:
- **Frontend:** `https://render-assigned-url.onrender.com`
- **Backend API:** `https://render-assigned-url.onrender.com/api`

### If Using Vercel:
- **Frontend:** `https://your-project.vercel.app`
- **Backend API:** `https://your-project.vercel.app/api`

---

## 🚨 Troubleshooting

### Issue 1: Build Fails
**Check logs:**
```bash
# Heroku
heroku logs --tail -a pustakkhana-app

# Railway (in dashboard)
# Render (in dashboard)
```

**Common causes:**
- Node version mismatch
- Missing environment variables
- CSV files not committed to git

**Fix:**
```bash
git add .
git commit -m "Fix deployment"
git push heroku main
```

### Issue 2: Books Don't Load
**Causes:**
1. MongoDB not connected (check `MONGODB_URI`)
2. CSV files not in `/server/data/`

**Check:**
```bash
# Heroku
heroku run "ls -la server/data/" -a pustakkhana-app
```

### Issue 3: API Returns 404
**This is normal** if you're accessing `/api/books` directly in browser

**Instead:**
- Use the app at `https://your-app.com` (not `/api/books`)
- Or use `curl`: `curl https://your-app.com/api/books`

### Issue 4: CORS Errors
**This is fixed** - both frontend and backend are on same domain now

---

## ✨ Summary

✅ **Everything on one platform**
✅ **No complex routing needed**
✅ **Same database connection**
✅ **Simple to maintain**
✅ **Easy to scale**

**Pick any platform above and follow the steps. You're done!**

---

## 📞 Quick Deployment Commands

**Heroku:**
```bash
heroku create pustakkhana-app
heroku config:set MONGODB_URI="your-string" -a pustakkhana-app
heroku config:set JWT_SECRET="your-key" -a pustakkhana-app
git push heroku main
```

**Railway:**
- Go to https://railway.app
- New Project → GitHub → Select repo → Add env vars → Deploy

**Render:**
- Go to https://render.com
- New → Web Service → GitHub → Configure → Deploy

**Vercel:**
```bash
npm i -g vercel
vercel
# Follow prompts and add env vars in dashboard
```

---

**Choose one, follow the steps, and you're live! 🚀**
