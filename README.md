# Pustakkhana - Online Book Vending Platform

A full-stack web application for an online bookstore featuring user authentication, book catalog from CSV, shopping cart, and order management.

## Features

✅ **User Authentication** - Register and login with JWT tokens
✅ **Book Catalog** - 955 books from CSV with rich metadata
✅ **Search & Filter** - Search by title/author, filter by genre and language
✅ **Shopping Cart** - Add/remove books, adjust quantities
✅ **Order Management** - Place orders and view order history
✅ **Responsive UI** - Modern, mobile-friendly interface

## Tech Stack

**Backend:**
- Node.js & Express
- MongoDB
- JWT Authentication
- CSV Parser

**Frontend:**
- React
- React Router
- Axios for API calls
- CSS Styling

## Project Structure

```
pustakkhana/
├── server/                 # Backend
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── models/        # MongoDB schemas
│   │   ├── middleware/    # Auth middleware
│   │   ├── routes/        # API routes
│   │   ├── utils/         # CSV parser
│   │   └── server.js      # Main server file
│   ├── package.json
│   └── .env
├── client/                 # Frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # React components
│   │   ├── utils/         # API utilities
│   │   ├── styles/        # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
└── data/                   # CSV files (should be placed here)
    ├── catelog - Catalog File.csv
    └── Untitled spreadsheet - Listing file.csv
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB running locally on port 27017
- The CSV data files in `/data` folder

### Backend Setup

```bash
cd server
npm install
npm start
```

Server runs on `http://localhost:5001`

### Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## Environment Variables

Create a `.env` file in the server directory:

```
MONGODB_URI=mongodb://localhost:27017/pustakkhana
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5001
NODE_ENV=development
```

## CSV Files

Place the following CSV files in `/Users/dhruvawani17/Documents/pustakkhana/data/`:

1. `catelog - Catalog File.csv` - Book catalog with metadata
2. `Untitled spreadsheet - Listing file.csv` - Book pricing information

The backend automatically merges these files and loads 955 books into MongoDB on first startup.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books` - Get all books (with pagination, search, filters)
- `GET /api/books/:id` - Get single book
- `GET /api/books/filters/genres` - Get available genres
- `GET /api/books/filters/languages` - Get available languages

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get specific order (requires auth)

## User Flow

1. **Register/Login** - Create account or login
2. **Browse Books** - Search and filter through 955 books
3. **Add to Cart** - Click "Add to Cart" button on books
4. **Checkout** - Review cart and place order
5. **My Orders** - View order history

## Sample Login

You can create an account with any email and password on the registration page.

## Features Overview

### Search & Filters
- Full-text search by book title or author
- Filter by genre
- Filter by language
- Pagination (12 books per page)

### Shopping Cart
- Local storage-based cart (persists between sessions)
- Adjust quantities
- Remove items
- Calculate total price with discount display

### Order Management
- Place orders with multiple books
- View complete order history
- Order details with book information and pricing
- Order status tracking

## Database Schema

### Users
- name, email, password (hashed)
- timestamps

### Books
- Book metadata from catalog CSV
- MRP and selling price from listing CSV
- Stock count information

### Orders
- userId reference
- Array of ordered books with quantities and prices
- Total price
- Order status (pending/completed/cancelled)
- timestamps

## Notes

- Cart is stored in browser's localStorage
- All prices are in Indian Rupees (₹)
- Authentication uses JWT tokens valid for 7 days
- Stock counts are stored but not enforced in current version

## Future Enhancements

- Payment gateway integration
- Email notifications
- Order tracking with status updates
- Wishlist feature
- Product reviews and ratings
- Admin panel for inventory management
