# MongoDB Atlas Setup for Vercel Deployment

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free"
3. Sign up with email or Google account
4. Create a new project (name it "Pustakkhana")

## Step 2: Create a Cluster
1. Click "Create a Deployment"
2. Select "Free" tier (M0)
3. Choose a region (select one close to your Vercel region)
4. Click "Create Deployment"
5. Wait for cluster to be deployed (takes ~5 minutes)

## Step 3: Create Database User
1. In the left sidebar, go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Create username: `pustakkhana`
4. Create password: (use a strong password, save it)
5. Click "Add User"

## Step 4: Get Connection String
1. Go to "Deployment" → "Databases"
2. Click "Connect" next to your cluster
3. Select "Drivers"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Replace `<database>` with `pustakkhana`

**Example:**
```
mongodb+srv://pustakkhana:YOUR_PASSWORD@cluster0.abc123.mongodb.net/pustakkhana?retryWrites=true&w=majority
```

## Step 5: Add to Vercel
1. Go to your Vercel project settings
2. Go to "Environment Variables"
3. Add new variable:
   - Name: `MONGODB_URI`
   - Value: Your connection string from Step 4
4. Click "Add"
5. Deploy your project again

## Step 6: Verify Connection
After deployment, check: `https://your-domain.vercel.app/health`

You should see:
```json
{
  "status": "OK",
  "database": "connected",
  "booksInDatabase": 0
}
```

(Books count will be 0 initially, then get populated from CSV)
