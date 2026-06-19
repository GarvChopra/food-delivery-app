# 🍔 MealMate — Food Delivery App

![Node.js](https://img.shields.io/badge/Node.js-v24-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-black?logo=express)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![ImageKit](https://img.shields.io/badge/ImageKit-Video_Storage-orange)
![JWT](https://img.shields.io/badge/JWT-Auth-red?logo=jsonwebtokens)

A full-stack Zomato-like food delivery application where food partners can upload food videos and users can browse them in an Instagram Reels-style feed, visit stores, and place orders.

---

## Tech Stack

### Backend
- **Node.js** — Runtime environment
- **Express.js v4** — REST API framework
- **Neon PostgreSQL** — Serverless cloud database
- **pg** — PostgreSQL client for Node.js
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT authentication
- **multer** — File/video upload handling
- **ImageKit** — Video/media cloud storage
- **cookie-parser** — Cookie handling
- **cors** — Cross-origin resource sharing
- **dotenv** — Environment variable management
- **uuid** — Unique ID generation
- **nodemon** — Development auto-restart

### Frontend
- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **React Router DOM** — Client-side routing
- **Axios** — HTTP requests
- **Tailwind CSS** — Utility-first styling

---

## Features

- 🔐 **Auth** — Register/login/logout for both Users and Food Partners with JWT cookies
- 🎬 **Reels Feed** — Instagram/TikTok-style vertical video feed for users
- 🏪 **Store Page** — Food partners can manage their store and food items
- 📹 **Video Upload** — Food partners upload food videos stored on ImageKit
- ✏️ **CRUD** — Food partners can create, edit, and delete food items
- 🛒 **Cart** — Users can add items to cart, adjust quantity, and place orders
- 🔒 **Protected Routes** — Middleware for user and food partner authentication

---

## Project Structure

```
imgae_app/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── UserChoice.jsx
│   │   │   ├── PartnerChoice.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   ├── UserRegister.jsx
│   │   │   ├── FoodPartnerLogin.jsx
│   │   │   ├── FoodPartnerRegister.jsx
│   │   │   ├── Home.jsx        # Reels feed
│   │   │   └── Store.jsx       # Store page
│   │   ├── food-partner/
│   │   │   └── CreateFood.jsx  # Food upload page
│   │   └── routes/
│   │       └── AppRoutes.jsx
│   └── package.json
│
└── server/                     # Node.js backend
    ├── config/
    │   ├── db.js               # Neon PostgreSQL connection
    │   └── imagekit.config.js  # ImageKit setup
    ├── controllers/
    │   ├── authController.js   # Register/login/logout
    │   └── food.controller.js  # Food CRUD
    ├── middleware/
    │   └── auth.middleware.js  # JWT auth middleware
    ├── models/
    │   ├── User.js             # Users table
    │   ├── FoodPartner.js      # Food partners table
    │   └── Food.js             # Foods table
    ├── routes/
    │   ├── authRoutes.js
    │   └── foodroutes.js
    ├── services/
    │   └── storage.service.js  # ImageKit upload
    ├── app.js
    ├── server.js
    └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Neon PostgreSQL account
- ImageKit account

### Backend Setup

```bash
cd server
npm install
```

Create `.env` file in the `server` folder:

```env
DATABASE_URL=postgresql://username:password@ep-xxxx.neon.tech/neondb?sslmode=require
PORT=5000
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login as user |
| POST | `/logout` | Logout user |
| POST | `/foodpartner/register` | Register food partner |
| POST | `/foodpartner/login` | Login as food partner |
| POST | `/foodpartner/logout` | Logout food partner |

### Food Routes — `/api/food`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Upload food item with video | Food Partner |
| GET | `/` | Get all food items (reels feed) | User |
| GET | `/store/:partnerId` | Get store foods by partner | Public |
| PUT | `/:id` | Update food item | Food Partner |
| DELETE | `/:id` | Delete food item | Food Partner |

---

## User Flow

```
Landing Page (/)
    ├── I'm a User → /user → Login or Register → /home (Reels Feed)
    │                                               └── Visit Store → /store/:id → Add to Cart → Place Order
    │
    └── I'm a Food Partner → /food-partner → Login or Register → /store/:id (My Store)
                                                                    └── Add Food → /create-food → Upload Video
```

---

## Database Schema

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    role VARCHAR(255) DEFAULT 'user',
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Food Partners table
CREATE TABLE food_partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    role VARCHAR(255) DEFAULT 'partner',
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Foods table
CREATE TABLE foods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    video VARCHAR(255) NOT NULL,
    description TEXT,
    food_partner_id INT REFERENCES food_partners(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## License

MIT
