# 🚀 Vercel Deployment Guide for Pustakkhana

## The 404 Error Issue on Vercel

Vercel is primarily a **frontend platform**. It's designed for React apps, but your Pustakkhana has both frontend and backend (Express + MongoDB).

**Solution:** Deploy frontend to Vercel, backend to a separate service.

---

## 📋 Deployment Architecture

```
┌─────────────────────────────────────────┐
│          Vercel (Frontend)              │
│  https://your-app.vercel.app            │
│  ├── React App                          │
│  ├── Book Catalog UI                    │
│  └── Shopping Cart UI                   │
└──────────────────┬──────────────────────┘
                   │
                   │ API Calls
                   ↓
┌─────────────────────────────────────────┐
│    Heroku/Railway/Render (Backend)      │
│  https://api.your-app.com               │
│  ├── Express Server                     │
│  ├── MongoDB Connection                 │
│  ├── /api/books                         │
│  └── /api/orders                        │
└─────────────────────────────────────────┘
```

---

## ✅ Step 1: Deploy Frontend to Vercel

### 1.1 Install Vercel CLI
```bash
npm i -g vercel
```

### 1.2 Deploy Frontend
```bash
cd /Users/dhruvawani17/Documents/pustakkhana/client
vercel
```

**During deployment, answer:**
- Project name: `pustakkhana-client`
- Framework: **Next.js** (wait for detection)
- Build command: `npm run build`
- Output directory: `build`

**Your frontend will be at:** `https://pustakkhana-client.vercel.app`

---

## ✅ Step 2: Deploy Backend to Heroku (Free Alternative)

Since Vercel doesn't support Node.js backends well, use Heroku for the backend:

### 2.1 Install Heroku CLI
```bash
brew tap heroku/brew && brew install heroku
```

### 2.2 Login to Heroku
```bash
heroku login
```

### 2.3 Create Heroku App
```bash
cd /Users/dhruvawani17/Documents/pustakkhana
heroku create pustakkhana-api
```

### 2.4 Set Environment Variables
```bash
heroku config:set MONGODB_URI="your-mongodb-connection-string" -a pustakkhana-api
heroku config:set JWT_SECRET="your-very-secure-secret-key" -a pustakkhana-api
heroku config:set NODE_ENV="production" -a pustakkhana-api
```

### 2.5 Deploy Backend
```bash
git push heroku main
```

**Your backend will be at:** `https://pustakkhana-api.herokuapp.com`

---

## ✅ Step 3: Connect Frontend to Backend

### 3.1 Update API URL in Frontend

Edit `client/src/utils/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

export const booksAPI = {
  getBooks: (params) => API.get('/books', { params }),
  getBook: (id) => API.get(`/books/${id}`),
  getGenres: () => API.get('/books/filters/genres'),
  getLanguages: () => API.get('/books/filters/languages'),
};

export const ordersAPI = {
  createOrder: (data) => API.post('/orders', data),
  getOrders: () => API.get('/orders'),
  getOrder: (id) => API.get(`/orders/${id}`),
};

export default API;
```

### 3.2 Create `.env.production` in client folder

```
REACT_APP_API_URL=https://pustakkhana-api.herokuapp.com
```

### 3.3 Update `client/package.json`

Remove the proxy line if it exists:
```json
{
  "name": "pustakkhana-client",
  "version": "0.1.0",
  "private": true,
  // Remove this line:
  // "proxy": "http://localhost:5001",
  ...
}
```

### 3.4 Redeploy to Vercel
```bash
cd client
vercel --prod
```

---

## ✅ Step 4: Get MongoDB Connection String

### Use MongoDB Atlas (Cloud - Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account (free tier available)
3. Create cluster
4. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/pustakkhana?retryWrites=true&w=majority
   ```

5. Set on Heroku:
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/pustakkhana?retryWrites=true&w=majority" -a pustakkhana-api
   ```

---

## 🧪 Testing

### Test 1: Check Backend Health
```bash
curl https://pustakkhana-api.herokuapp.com/health
```

Should return:
```json
{"status":"OK","message":"Server is running"}
```

### Test 2: Get Books
```bash
curl https://pustakkhana-api.herokuapp.com/api/books?limit=1
```

Should return JSON with books data

### Test 3: Open Frontend
Open `https://pustakkhana-client.vercel.app` in browser

Should see:
- Book catalog loading
- Books displaying
- Add to cart button working
- No 404 errors

---

## 📝 Setup Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Heroku
- [ ] MongoDB Atlas account created
- [ ] Environment variables set on Heroku
- [ ] API URL updated in frontend
- [ ] `.env.production` created
- [ ] Frontend redeployed to Vercel
- [ ] Backend health check working
- [ ] API endpoints returning data
- [ ] Frontend loads books
- [ ] Add to cart works
- [ ] No CORS errors

---

## 🔗 Final URLs

After deployment:
- **Frontend:** `https://pustakkhana-client.vercel.app`
- **Backend API:** `https://pustakkhana-api.herokuapp.com/api`
- **GitHub:** `https://github.com/pustakhana/website`

---

## 🚨 Common Issues on Vercel

### Issue 1: CORS Errors
If you see CORS errors, update backend `server/src/server.js`:

```javascript
app.use(cors({
  origin: [
    'https://pustakkhana-client.vercel.app',
    'http://localhost:3000',
    'http://localhost:5001'
  ],
  credentials: true
}));
```

Then redeploy backend:
```bash
git push heroku main
```

### Issue 2: 404 on Frontend
**This is expected on Vercel.** You need to use a separate backend service.

### Issue 3: API Calls Failing
Check:
1. Backend URL correct in `.env.production`
2. Backend deployed and running: `curl backend-url/health`
3. MongoDB connected: Check Heroku logs: `heroku logs --tail -a pustakkhana-api`

---

## 📊 Monitoring

### Vercel Dashboard
- Go to https://vercel.com/dashboard
- Select project `pustakkhana-client`
- View deployments, logs, and analytics

### Heroku Dashboard
- Go to https://dashboard.heroku.com
- Select app `pustakkhana-api`
- View logs, metrics, and settings

### Check Logs
```bash
# Heroku backend logs
heroku logs --tail -a pustakkhana-api

# Vercel frontend logs (in dashboard or CLI)
vercel logs
```

---

## 🚀 Deployment Summary

1. **Frontend (React)** → Vercel
2. **Backend (Express)** → Heroku
3. **Database (MongoDB)** → MongoDB Atlas
4. **Code Repository** → GitHub

This architecture is:
- ✅ Scalable
- ✅ Cost-effective (free tiers available)
- ✅ Easy to maintain
- ✅ Industry standard

---

## 💡 Alternative Backends (if Heroku free tier ends)

- **Railway.app** - Free tier available
- **Render.com** - Free tier available
- **Fly.io** - Free tier available
- **AWS** - Minimal charges

All work the same way: Deploy backend, get API URL, update frontend.

---

## ✨ Done!

Your Pustakkhana app is now live on Vercel! 🎉

**Share your app:** `https://pustakkhana-client.vercel.app`
