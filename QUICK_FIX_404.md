# 🔴 FIXING 404 NOT_FOUND ERROR

If you're getting `404: NOT_FOUND` after deployment, here's the exact fix:

---

## 🎯 Immediate Action Items

### Step 1: Identify the Platform
Where did you deploy? (Check your terminal/dashboard)
- [ ] Google Cloud Platform (GCP)
- [ ] Heroku
- [ ] Railway.app
- [ ] Render.com
- [ ] Vercel
- [ ] Other: ________

### Step 2: Check API Endpoint
Test if backend is accessible:
```bash
curl https://your-app-url/health
```

**If this returns JSON:** Backend is working ✅
**If this returns 404:** Continue below

---

## 🔧 Quick Fixes by Platform

### GCP App Engine Fix

1. **Update app.yaml:**
```yaml
runtime: nodejs18
env: standard

handlers:
  - url: ".*"
    script: auto

env_variables:
  MONGODB_URI: "your-mongodb-connection-string"
  JWT_SECRET: "your-jwt-secret"
  NODE_ENV: "production"
```

2. **Deploy:**
```bash
gcloud app deploy
```

3. **Check logs:**
```bash
gcloud app logs read -l 50
```

---

### Heroku Fix

1. **Create Procfile** (already in repo)
```
web: cd server && npm start
```

2. **Set environment variables:**
```bash
heroku config:set MONGODB_URI="your-mongodb-url"
heroku config:set JWT_SECRET="your-secret"
heroku config:set NODE_ENV="production"
```

3. **Re-deploy:**
```bash
git push heroku main
```

4. **Check logs:**
```bash
heroku logs --tail
```

---

### Railway.app Fix

1. Go to your Railway dashboard
2. Select your project
3. Go to **Variables**
4. Add:
   - `MONGODB_URI`: your MongoDB connection string
   - `JWT_SECRET`: any secure string
   - `NODE_ENV`: production
5. Click "Deploy Latest Commit"

---

### Render.com Fix

1. Go to your Render dashboard
2. Select your service
3. Go to **Environment** 
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV: production`
5. Manual deploy from **Deploys** tab

---

## ✅ Verification Steps

After applying fixes above, test:

```bash
# Test 1: Health check (should return 200)
curl -v https://your-app/health

# Test 2: Get books (should return JSON array)
curl https://your-app/api/books?limit=1

# Test 3: Open in browser
https://your-app
# Should show book catalog
```

---

## 🚨 If Still Not Working

### Check These Common Issues

**1. CSV Files Missing:**
```bash
# Verify files committed to repo
git log --name-status | grep ".csv"

# Should show both CSV files committed
```

If missing, add them:
```bash
git add server/data/*.csv
git commit -m "Add CSV data files"
git push origin main
```

---

**2. MongoDB Connection Error:**

Create MongoDB Atlas account:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Set as `MONGODB_URI` environment variable
5. Re-deploy

Example MongoDB URI:
```
mongodb+srv://username:password@cluster.mongodb.net/pustakkhana?retryWrites=true&w=majority
```

---

**3. Port Mismatch:**

The platform should set PORT automatically. Verify:
- GCP/Railway/Render: Usually sets PORT=8080
- Don't hardcode port in code
- Use `process.env.PORT` in server

---

**4. Node.js Version:**

Check if platform supports Node 18:
```bash
# In package.json or app.yaml
"engines": { "node": "18.x" }
```

If platform doesn't support 18, use 16:
```bash
"engines": { "node": "16.x" }
```

---

## 📋 Complete Checklist

- [ ] Environment variables set (MONGODB_URI, JWT_SECRET)
- [ ] CSV files committed to git
- [ ] app.yaml or Procfile present
- [ ] package.json in root and server folders
- [ ] Node version 16+ specified
- [ ] No .env file committed (should be in .gitignore)
- [ ] Health endpoint returns 200
- [ ] API endpoint returns books data
- [ ] Frontend loads in browser

---

## 🆘 Get Exact Error

If still failing, get detailed error:

**On GCP:**
```bash
gcloud app logs read --limit 100 --format json
```

**On Heroku:**
```bash
heroku logs --tail --lines 100
```

**On Railway/Render:**
Check dashboard logs and paste them

---

## 📞 Final Debug Script

Run this to test everything locally:
```bash
#!/bin/bash

echo "=== Testing Local Setup ==="
echo "1. MongoDB running?"
brew services list | grep mongodb

echo -e "\n2. Backend running?"
curl -s http://localhost:5001/api/books | head -20

echo -e "\n3. Frontend running?"
curl -s http://localhost:3000 | grep -o '<title>.*</title>'

echo -e "\n4. CSV files exist?"
ls -la server/data/*.csv

echo -e "\n5. Environment variables set?"
cat server/.env
```

---

**After fixing:** Redeploy and test at your deployed URL! 🎉
