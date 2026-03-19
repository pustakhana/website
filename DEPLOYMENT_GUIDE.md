# 🚀 Pustakkhana Deployment Guide

## 🔴 Troubleshooting: 404 NOT_FOUND Error

If you're getting a 404 error after deployment, follow this checklist:

---

## ✅ Step 1: Check Local Instance (Verify Everything Works)

```bash
# Terminal 1
brew services start mongodb/brew/mongodb-community

# Terminal 2
cd server && npm start

# Terminal 3
cd client && npm start

# Open http://localhost:3000
```

If local works but deployed version doesn't, continue to Step 2.

---

## ✅ Step 2: Check Deployment Logs

**If deployed on Google Cloud Platform (GCP):**
```bash
# View logs
gcloud app logs read

# View specific service logs
gcloud logging read "resource.type=app_engine_app" --limit 50 --format json
```

**If deployed on Heroku:**
```bash
# View logs
heroku logs --tail

# For specific app
heroku logs --tail -a your-app-name
```

**If deployed on Railway/Render/other:**
- Check the deployment platform's dashboard logs section

---

## ✅ Step 3: Common Issues & Fixes

### Issue 1: **CSV Files Missing**
**Problem:** Backend can't find `catelog - Catalog File.csv` and `Untitled spreadsheet - Listing file.csv`

**Solution:**
```bash
# Ensure CSV files are in server/data/ directory
ls -la server/data/

# Files should be:
# - catelog - Catalog File.csv
# - Untitled spreadsheet - Listing file.csv

# If missing, re-add to git
git add server/data/*.csv
git commit -m "Add CSV data files"
git push origin main
```

---

### Issue 2: **Environment Variables Not Set**

**Problem:** MongoDB URI or JWT secret not configured

**Solution on GCP App Engine:**
```bash
# Edit app.yaml in root directory
gcloud app deploy

# Or set environment variables:
gcloud app deploy --set-env-vars MONGODB_URI="your-mongodb-uri",JWT_SECRET="your-secret"
```

**Solution on Heroku:**
```bash
# Set config variables
heroku config:set MONGODB_URI="your-mongodb-uri" -a your-app-name
heroku config:set JWT_SECRET="your-jwt-secret" -a your-app-name
heroku config:set NODE_ENV="production" -a your-app-name
```

---

### Issue 3: **MongoDB Connection Failing**

**Problem:** Backend can't connect to MongoDB

**Solution:**
1. If using MongoDB Atlas (cloud):
   ```bash
   # Connection string format:
   mongodb+srv://username:password@cluster.mongodb.net/pustakkhana
   ```

2. Update `.env` in server folder:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pustakkhana
   JWT_SECRET=your-jwt-secret-key
   PORT=5000
   NODE_ENV=production
   ```

3. Re-deploy with new environment variables

---

### Issue 4: **Backend Not Starting**

**Problem:** Server crashes on startup

**Solution - Check for these common issues:**

1. **Missing dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **CSV parser path issue:**
   Edit `server/src/utils/csvParser.js`:
   ```javascript
   // Change from relative path to absolute
   const catalogPath = path.join(__dirname, '../../data/catelog - Catalog File.csv');
   
   // If on deployed server, may need:
   const catalogPath = '/app/server/data/catelog - Catalog File.csv';
   ```

3. **Port already in use:**
   Edit `server/.env`:
   ```
   PORT=5000
   # or change to 8080, 3001, etc.
   ```

---

### Issue 5: **Frontend Not Loading (React App)**

**Problem:** Getting blank page or 404

**Solution:**

1. **Check build output:**
   ```bash
   cd client
   npm run build
   ```

2. **Verify package.json has correct scripts:**
   ```json
   {
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build"
     }
   }
   ```

3. **Check API proxy settings in client/package.json:**
   ```json
   {
     "proxy": "http://localhost:5001"  // For development
   }
   ```

---

## 🚀 Complete Deployment Checklist

### Pre-Deployment
- [ ] All files committed to git
- [ ] CSV files in `server/data/` directory
- [ ] `.env` file configured with production values
- [ ] `node_modules/` in `.gitignore`
- [ ] No sensitive data in code
- [ ] Local testing passed

### Deployment Configuration
- [ ] Environment variables set on platform
- [ ] MongoDB connection string correct
- [ ] JWT secret configured
- [ ] PORT set to correct value (5000, 8080, etc.)
- [ ] NODE_ENV set to "production"

### Post-Deployment
- [ ] Backend API responds: `curl https://your-app/api/books`
- [ ] Frontend loads: `https://your-app/`
- [ ] Books display from CSV data
- [ ] Add to cart works
- [ ] No console errors in browser

---

## 📋 Deployment Platform-Specific Guides

### Google Cloud Platform (App Engine)

**Create `app.yaml` in root:**
```yaml
runtime: nodejs16
env: standard

env_variables:
  MONGODB_URI: "your-mongodb-uri"
  JWT_SECRET: "your-jwt-secret"
  NODE_ENV: "production"

handlers:
  - url: ".*"
    script: auto

automatic_scaling:
  min_instances: 1
  max_instances: 5
```

**Deploy:**
```bash
gcloud app deploy
```

---

### Heroku

**Create `Procfile` in root:**
```
web: node server/src/server.js
```

**Create `package.json` in root (if needed):**
```json
{
  "name": "pustakkhana",
  "version": "1.0.0",
  "engines": {
    "node": "16.x"
  },
  "scripts": {
    "start": "node server/src/server.js",
    "build": "cd client && npm install && npm run build"
  }
}
```

**Deploy:**
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set MONGODB_URI="your-uri"
heroku config:set JWT_SECRET="your-secret"
```

---

### Railway.app

**Automatic deployment from GitHub:**
1. Connect GitHub repo
2. Set environment variables in dashboard
3. Deploy automatically

---

### Render.com

**Create `render.yaml` in root:**
```yaml
services:
  - type: web
    name: pustakkhana-backend
    runtime: node
    startCommand: cd server && npm start
    envVars:
      - key: MONGODB_URI
        value: "your-mongodb-uri"
      - key: JWT_SECRET
        value: "your-jwt-secret"

  - type: static
    name: pustakkhana-frontend
    staticPublishPath: client/build
    buildCommand: cd client && npm install && npm run build
```

---

## 🔧 Quick Fixes

### Fix 1: Update CSV File Paths

If backend can't find CSV files:

```javascript
// server/src/utils/csvParser.js - Add fallback paths
const catalogPath = 
  process.env.NODE_ENV === 'production'
    ? '/app/server/data/catelog - Catalog File.csv'
    : path.join(__dirname, '../../data/catelog - Catalog File.csv');
```

### Fix 2: Add Health Check Endpoint

```javascript
// server/src/server.js - Add before other routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});
```

Then test: `curl https://your-app/health`

### Fix 3: CORS Issues for Frontend

```javascript
// server/src/server.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5001',
    'https://your-deployed-domain.com',
    'https://*.railway.app',
    'https://*.herokuapp.com'
  ]
}));
```

---

## 📝 Testing After Deployment

1. **Test Backend:**
   ```bash
   curl https://your-app-backend/api/books?limit=1
   ```
   Should return JSON with books data

2. **Test Frontend:**
   Open `https://your-app` in browser
   Should see book catalog

3. **Test Cart:**
   - Click "Add to Cart"
   - Should show success message
   - Cart count should update

4. **Test Checkout:**
   - Add books to cart
   - Go to cart page
   - Click checkout
   - Should process order

---

## 🆘 Still Getting 404?

**If you're still seeing 404 after following above:**

1. **Check exact error:**
   ```bash
   # Get full error details
   curl -v https://your-app-url/api/books
   ```

2. **Verify API endpoint:**
   - Backend should respond on `/api/books`
   - Frontend should request from same domain

3. **Check backend is actually running:**
   ```bash
   # On deployment platform terminal
   ps aux | grep node
   ```

4. **Review deployment logs:**
   - Look for "Error", "ENOENT", "Cannot find module"
   - Check MongoDB connection errors
   - Check port binding errors

---

## 📞 Getting Help

If still stuck, provide:
1. **Deployment platform** (GCP, Heroku, Railway, etc.)
2. **Full error log** from deployment
3. **Output of:** `curl https://your-app/health`
4. **Output of:** `curl https://your-app/api/books`

---

**Your application should now be working on production!** 🎉
