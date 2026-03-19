# ✅ Pre-Deployment Checklist for Pustakkhana

## 🔍 Before Deployment Verification

### Local Testing
- [x] Backend running on `localhost:5001`
- [x] Frontend running on `localhost:3000`
- [x] MongoDB connected locally
- [x] 955 books loaded from CSV
- [x] Add to cart works
- [x] Orders can be placed
- [x] No console errors

### Code Quality
- [x] No sensitive data in code
- [x] Environment variables in `.env`
- [x] `.gitignore` configured properly
- [x] All dependencies in `package.json`
- [x] Error handling implemented
- [x] CORS configured

### File Structure
- [x] CSV files in `server/data/`
- [x] All routes created
- [x] All models defined
- [x] Middleware configured
- [x] Frontend pages complete
- [x] Styles included

---

## 🚀 Deployment Platform Setup

### Choose Your Platform

#### Option 1: Google Cloud Platform (App Engine)
```bash
# Install GCP CLI
brew install google-cloud-sdk

# Login
gcloud auth login

# Create project
gcloud projects create pustakkhana

# Set project
gcloud config set project pustakkhana

# Deploy
gcloud app deploy
```

#### Option 2: Heroku
```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku login

# Create app
heroku create pustakkhana

# Set environment variables
heroku config:set MONGODB_URI="your-uri" -a pustakkhana
heroku config:set JWT_SECRET="your-secret" -a pustakkhana

# Deploy
git push heroku main
```

#### Option 3: Railway.app
1. Go to https://railway.app
2. Sign in with GitHub
3. Create new project
4. Select GitHub repository
5. Set environment variables
6. Deploy automatically

#### Option 4: Render.com
1. Go to https://render.com
2. Sign in with GitHub
3. Create web service
4. Select GitHub repository
5. Set environment variables
6. Deploy

---

## 🗄️ MongoDB Setup

### Option 1: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pustakkhana
   ```

### Option 2: Self-Hosted MongoDB
- Use MongoDB Docker container
- Or install MongoDB on server
- Set connection string to server IP/domain

---

## 📝 Environment Variables

**Required for production:**
```
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/pustakkhana

# JWT
JWT_SECRET=your-very-secure-random-string-at-least-32-characters

# Environment
NODE_ENV=production

# Port (usually set by platform)
PORT=5000
```

**Optional:**
```
# CORS origins
CORS_ORIGIN=https://your-domain.com

# Session
SESSION_SECRET=your-session-secret

# Logging
LOG_LEVEL=info
```

---

## 📦 Pre-Deployment Commits

```bash
# Add deployment files
git add app.yaml Procfile package.json DEPLOYMENT_GUIDE.md

# Commit
git commit -m "Add deployment configuration files"

# Push to GitHub
git push origin main
```

---

## 🧪 Post-Deployment Testing

### Test Backend
```bash
# Get single book
curl https://your-app.com/api/books?limit=1

# Check health
curl https://your-app.com/health
```

### Test Frontend
1. Open `https://your-app.com`
2. Browse books
3. Add to cart
4. Place order
5. Check My Orders

### Monitor Performance
- Check deployment logs
- Monitor error rates
- Check API response times
- Monitor database queries

---

## 🔐 Security Checklist

- [x] No hardcoded credentials in code
- [x] Environment variables for secrets
- [x] HTTPS enforced
- [x] CORS properly configured
- [x] Input validation implemented
- [x] Password hashing enabled
- [x] JWT tokens configured
- [x] Rate limiting (optional)
- [x] SQL injection prevention
- [x] XSS protection

---

## 📊 Monitoring After Deployment

### Set Up Monitoring
1. **Error Tracking:** Sentry or DataDog
2. **Performance:** New Relic or Datadog
3. **Logs:** Platform's native logging
4. **Uptime:** UptimeRobot or StatusPage

### Alerts to Configure
- High error rate (>5%)
- API latency >2s
- Database connection errors
- Out of memory
- Disk space low

---

## 🆘 Troubleshooting Deployment

### If you get 404 NOT_FOUND

1. **Check backend health:**
   ```bash
   curl https://your-app/health
   ```

2. **Check logs:**
   - GCP: `gcloud app logs read`
   - Heroku: `heroku logs --tail`
   - Railway: Check dashboard
   - Render: Check logs

3. **Common causes:**
   - CSV files not in deployment
   - Environment variables not set
   - MongoDB not connected
   - Port mismatch
   - CORS configuration

4. **Solutions:**
   - Re-deploy: `git push origin main`
   - Update env vars on platform
   - Check CSV file paths
   - Verify MongoDB URI
   - Check startup logs

---

## 📞 Support Resources

- **GCP:** https://cloud.google.com/app-engine/docs
- **Heroku:** https://devcenter.heroku.com
- **Railway:** https://docs.railway.app
- **Render:** https://render.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com

---

## ✨ Success Criteria

✅ Backend responds to `/api/books`
✅ Frontend loads without errors
✅ Books display from database
✅ Add to cart works
✅ Orders can be placed
✅ No 404 errors
✅ No console errors
✅ Performance is good (<2s response)
✅ Database connection stable
✅ All logs clean

---

**Ready to deploy?** Follow the steps above and your Pustakkhana app will be live! 🎉
