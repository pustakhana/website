# 🚀 Deploy to Railway.app (Easiest Full-Stack Solution)

Railway.app is perfect for your full-stack app because it supports Node.js + React + MongoDB all in ONE deployment.

---

## ✅ Step 1: Create Railway Account

Go to https://railway.app and sign up (free tier available)

---

## ✅ Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub"
3. Choose `pustakhana/website` repository
4. Authorize Railway to access your GitHub

---

## ✅ Step 3: Configure Environment Variables

In Railway dashboard, go to Variables and add:

```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/pustakkhana?retryWrites=true&w=majority
JWT_SECRET=pustakkhana_secret_key_2026
NODE_ENV=production
PORT=5001
```

**To get MongoDB connection string:**
- Go to https://www.mongodb.com/cloud/atlas
- Create free cluster
- Click "Connect" → copy connection string
- Replace `<password>` with your actual password

---

## ✅ Step 4: Configure Build & Start Commands

In Railway settings:

**Build Command:**
```bash
npm install && cd client && npm install && npm run build && cd ../server && npm install
```

**Start Command:**
```bash
cd server && npm start
```

---

## ✅ Step 5: Deploy

Click "Deploy" button. Railway automatically:
- ✅ Installs dependencies
- ✅ Builds React frontend
- ✅ Starts Express backend
- ✅ Serves everything as ONE app

**Takes ~5 minutes**

---

## ✅ After Deployment

Your app will be live at: **`https://your-project-name.railway.app`**

You can see:
- 📚 Book catalog
- 🛒 Shopping cart
- 📦 Orders

---

## 📊 Railway Dashboard

- View logs in real-time
- Monitor CPU/memory usage
- See deployment history
- Restart app if needed

---

## 🚀 That's it!

Railway handles everything - no complex serverless functions, no separate deployments. 

**It just works!** 🎉

---

## Alternative: If Railway Doesn't Work

Try **Render.com** - similar process:
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Add environment variables
5. Click Deploy

Works the same way!
