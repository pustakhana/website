# Pustakkhana - Quick Start Guide

## 🚀 Application is Ready!

Your Pustakkhana online book vending platform is now fully set up and running.

### Access the Application

**Frontend**: http://localhost:3000
**Backend API**: http://localhost:5001/api

### What's Running

✅ **Backend Server** - Port 5001 (Node.js + Express + MongoDB)
✅ **Frontend Server** - Port 3000 (React)
✅ **MongoDB Database** - Loading 955 books from CSV files
✅ **API Endpoints** - Ready for authentication, books, and orders

## 🔑 Test Credentials

You can create a new account during signup, or test with any email/password combination.

### Step-by-Step Usage

#### 1. **Register/Login**
   - Open http://localhost:3000
   - Click "Register here" to create a new account
   - Fill in: Name, Email, Password, Confirm Password
   - Click "Register"

#### 2. **Browse Books**
   - You'll see a catalog of 955 books
   - Features:
     - **Search**: Find books by title or author
     - **Filter by Genre**: Select from available genres
     - **Filter by Language**: Choose book language
     - **Pagination**: 12 books per page
   - Each book shows: Title, Author, Publisher, Binding, Language, MRP, Selling Price, and discount %

#### 3. **Add to Cart**
   - Click "🛒 Add to Cart" button on any book
   - You'll get a confirmation message
   - Cart persists even if you refresh or close the browser

#### 4. **View Cart**
   - Click "🛒 Cart (n)" button in the header
   - Adjust quantities with +/- buttons
   - Remove items with ✕ button
   - See total price and discount

#### 5. **Place Order**
   - Click "Proceed to Checkout" on the cart page
   - Order is placed and cart is cleared
   - Order shows as "COMPLETED"

#### 6. **View My Orders**
   - Click "📋 My Orders" in the header
   - See all orders you've placed
   - View detailed information: order ID, date, items, total price

#### 7. **Logout**
   - Click "Logout" button
   - You'll be redirected to login page

## 📊 Database Information

**MongoDB Collection: books**
- Total Books: 955 (from CSV files)
- Fields: Title, Author, Publisher, ISBN, Binding, Language, Genre, Images, MRP, Selling Price, Stock Count
- All book data automatically merged from:
  - catelog - Catalog File.csv (book metadata)
  - Untitled spreadsheet - Listing file.csv (pricing data)

**MongoDB Collections: users, orders**
- Users: Stored with hashed passwords using bcryptjs
- Orders: Linked to users, contains books array with quantities and prices

## 🔒 Security Features

✅ **Password Hashing**: bcryptjs with salt rounds = 10
✅ **JWT Authentication**: 7-day token expiration
✅ **Protected Routes**: All cart and order pages require authentication
✅ **Token Storage**: Stored in browser localStorage
✅ **API Authorization**: Bearer token required for order endpoints

## 📱 Features Implemented

✅ **User Authentication**
   - Register with email and password
   - Login with JWT tokens
   - Secure password hashing
   - Session persistence

✅ **Book Catalog**
   - 955 books from CSV
   - Full-text search
   - Genre filtering
   - Language filtering
   - Pagination
   - Book details with images

✅ **Shopping Cart**
   - Local storage-based cart
   - Quantity management
   - Price calculations
   - Discount display
   - Remove items

✅ **Order Management**
   - Place orders with multiple books
   - Order history with timestamps
   - Order status tracking
   - Detailed order information

✅ **Responsive UI**
   - Modern design with gradients
   - Mobile-friendly layout
   - Smooth interactions
   - Professional color scheme

## 🛠️ Technologies Used

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- csv-parser for CSV handling
- CORS for cross-origin requests

**Frontend:**
- React 18
- React Router v6
- Axios for HTTP requests
- CSS3 with gradients and animations
- Local Storage for cart persistence

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books` - Get books (supports pagination, search, filters)
- `GET /api/books/:id` - Get single book
- `GET /api/books/filters/genres` - Available genres
- `GET /api/books/filters/languages` - Available languages

### Orders (requires authentication)
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

## 🐛 Troubleshooting

**Frontend not loading?**
- Check if http://localhost:3000 is accessible
- Check browser console for errors
- Verify backend is running (check http://localhost:5001/api/books)

**Backend not responding?**
- Verify MongoDB is running: `brew services list`
- Start MongoDB: `brew services start mongodb/brew/mongodb-community`
- Check backend logs in terminal

**CSV data not loading?**
- Verify CSV files are in `/server/data/` directory
- Check file names:
  - `catelog - Catalog File.csv`
  - `Untitled spreadsheet - Listing file.csv`
- Restart backend server

**Login not working?**
- Clear browser localStorage: DevTools → Application → Clear Site Data
- Check MongoDB connection in backend logs

## 🚀 Future Enhancements

- Payment gateway integration (Stripe, Razorpay)
- Email notifications for orders
- Order tracking with real-time updates
- Wishlist feature
- Product reviews and ratings
- Admin dashboard
- Advanced search and recommendations
- Order statistics and analytics

## 📚 Project Structure

```
pustakkhana/
├── server/                          # Backend
│   ├── src/
│   │   ├── config/db.js            # MongoDB connection
│   │   ├── models/                 # Mongoose schemas
│   │   ├── middleware/auth.js      # JWT middleware
│   │   ├── routes/                 # API routes
│   │   ├── utils/csvParser.js      # CSV parsing logic
│   │   └── server.js               # Entry point
│   ├── data/                        # CSV files
│   ├── package.json
│   └── .env
├── client/                          # Frontend
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   ├── components/             # React components
│   │   ├── utils/api.js            # API client
│   │   ├── styles/                 # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/index.html
│   └── package.json
└── README.md

```

## 📞 Support

For any issues or questions, refer to the logs in the terminal windows where the servers are running.

**Enjoy using Pustakkhana! 📚✨**
