# 📚 PUSTAKKHANA - Online Book Vending Platform

## 🎯 Project Overview

Pustakkhana is a **complete, production-ready online bookstore** built with the MERN stack. It features user authentication, a catalog of 955 books with advanced search/filtering, shopping cart functionality, and order management.

---

## 🚀 QUICK START

### Current Status: ✅ ALL SYSTEMS RUNNING

**Access the Application:**
- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend**: http://localhost:5001
- 📊 **Database**: MongoDB (Local)

### Getting Started (New Session)

```bash
# Terminal 1 - Start MongoDB (if not running)
brew services start mongodb/brew/mongodb-community

# Terminal 2 - Start Backend
cd /Users/dhruvawani17/Documents/pustakkhana/server
npm start

# Terminal 3 - Start Frontend
cd /Users/dhruvawani17/Documents/pustakkhana/client
npm start
```

Then open **http://localhost:3000** in your browser!

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| **QUICKSTART.md** | Step-by-step guide to use the application |
| **IMPLEMENTATION_SUMMARY.md** | Complete technical documentation |
| **README.md** | Project overview and setup instructions |

👉 **Start with QUICKSTART.md for first-time users!**

---

## 🎮 Try It Now

### 1. Create Account
```
Go to: http://localhost:3000
Click: Register here
Fill: Name, Email, Password, Confirm Password
Click: Register
```

### 2. Browse Books
- Search for books by title or author
- Filter by genre or language
- Browse through 955 books

### 3. Shopping
- Click "🛒 Add to Cart" on books you like
- Click cart button to view and manage cart
- Adjust quantities or remove items

### 4. Checkout
- Click "Proceed to Checkout"
- Order is placed instantly
- See confirmation in My Orders

### 5. Track Orders
- Click "📋 My Orders" to see all your orders
- View order details, items, and totals

---

## ✨ Key Features

✅ **User Authentication** - Secure register/login with JWT
✅ **Book Catalog** - 955 books with rich metadata
✅ **Advanced Search** - Full-text search by title/author
✅ **Smart Filtering** - Filter by genre and language
✅ **Shopping Cart** - Add/remove items, manage quantities
✅ **Order Management** - Place orders and track history
✅ **Responsive Design** - Works on all devices
✅ **Secure** - Password hashing + JWT tokens

---

## 🏗️ Tech Stack

**Backend**: Node.js, Express, MongoDB, JWT, Bcryptjs
**Frontend**: React, React Router, Axios, CSS3
**Database**: MongoDB (Local)
**Authentication**: JWT Tokens

---

## 📊 Data

- **955 Books** from merged CSV files
- **Rich Metadata**: Title, Author, Publisher, ISBN, Binding, Language, Genre, Images
- **Pricing**: MRP and Selling Price for each book
- **Stock Information**: Available stock count

---

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT tokens for authentication (7-day expiry)
- Protected API endpoints
- CORS enabled for localhost
- No sensitive data in localStorage (except token)

---

## 📁 Project Structure

```
pustakkhana/
├── server/              # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── models/      # Database schemas
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Authentication
│   │   ├── utils/       # CSV parsing
│   │   └── server.js    # Entry point
│   └── data/            # CSV files
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # React components
│   │   ├── utils/       # API client
│   │   ├── styles/      # CSS files
│   │   └── App.js       # Main app
│   └── public/
└── docs/                # Documentation

```

---

## 🧪 API Endpoints

### Authentication
```
POST /api/auth/register    - Create new account
POST /api/auth/login       - Login with credentials
```

### Books
```
GET /api/books                        - Get all books (paginated)
GET /api/books/:id                    - Get single book
GET /api/books/filters/genres         - Available genres
GET /api/books/filters/languages      - Available languages
```

### Orders (Requires Auth)
```
POST /api/orders           - Create new order
GET /api/orders            - Get user's orders
GET /api/orders/:id        - Get order details
```

---

## 🎨 UI Preview

- **Beautiful gradient design** with purple theme
- **Modern card layout** for books
- **Smooth animations** and transitions
- **Responsive layout** for mobile and desktop
- **Clear navigation** with header buttons

---

## ✅ Testing Checklist

- [x] User registration works
- [x] User login works
- [x] Book catalog loads (955 books)
- [x] Search functionality works
- [x] Genre filtering works
- [x] Language filtering works
- [x] Add to cart works
- [x] Cart persists on refresh
- [x] Checkout process works
- [x] Orders are saved to database
- [x] My Orders page shows all orders
- [x] Logout works

---

## 🚨 Troubleshooting

**Application won't load?**
- ✅ Check MongoDB is running: `brew services list | grep mongodb`
- ✅ Verify backend: `curl http://localhost:5001/api/books`
- ✅ Verify frontend: `curl http://localhost:3000`

**Login not working?**
- ✅ Clear browser cache: DevTools → Application → Clear Site Data
- ✅ Restart servers

**Books not showing?**
- ✅ Check CSV files are in `/server/data/`
- ✅ File names must match exactly
- ✅ Restart backend server

---

## 📱 Features by Page

### Login/Register Page
- Email validation
- Password confirmation
- Error messages
- Link to toggle between pages

### Books Page
- Book catalog grid
- Search box
- Genre filter
- Language filter
- Pagination controls
- Cart button in header
- My Orders button
- Logout button

### Cart Page
- List of cart items
- Book images and details
- Quantity controls
- Remove item buttons
- Price summary
- Total calculation
- Checkout button

### Orders Page
- List of all user orders
- Order ID and date
- Order status
- Books in order
- Total price
- Discount information

---

## 🎓 What You Can Learn

This project demonstrates:
- Full MERN stack development
- Database schema design
- JWT authentication
- CSV data processing
- React hooks and routing
- RESTful API design
- Form validation
- State management
- Security best practices

---

## 🔮 Future Enhancements

- Payment gateway (Stripe, Razorpay)
- Email notifications
- Order tracking with updates
- Admin dashboard
- Product reviews
- Wishlist feature
- Recommendations engine
- Advanced analytics

---

## 📞 Support

- Check terminal logs for errors
- Review QUICKSTART.md for usage help
- Check IMPLEMENTATION_SUMMARY.md for technical details
- Read README.md for comprehensive documentation

---

## 🎉 You're All Set!

Your Pustakkhana platform is **ready to use**. 

1. Open http://localhost:3000 in your browser
2. Create an account
3. Start shopping!

**Happy Reading! 📚✨**

---

**Built with MERN Stack** | MongoDB • Express • React • Node.js
