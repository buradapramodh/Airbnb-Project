🏠 Airbnb Clone – Full Stack Web Application

A full-stack Airbnb-like rental booking platform that allows users to browse, create, edit, and manage property listings with location-based features, authentication, and image uploads.

🔗 Live Demo: (add your Render live link here)
🔗 GitHub Repo: (this repo)
🚀 Features

🔐 User Authentication (Signup / Login / Logout)

🏡 Create, Edit & Delete Property Listings

🖼 Image Upload with Cloudinary

🌍 Location Geocoding using Mapbox

🗺 Interactive Maps for Listings

🔎 Search & Filter Listings

💬 Flash Messages for Actions

🧾 Session-based Authentication

📱 Fully Responsive UI
🛠 Tech Stack
Frontend

EJS (Embedded JavaScript Templates)

HTML5, CSS3, Bootstrap

JavaScript

Backend

Node.js

Express.js

MongoDB & Mongoose

Passport.js (Authentication)

Cloud & Tools

MongoDB Atlas (Database)

Cloudinary (Image Storage)

Mapbox (Geocoding & Maps)
📂 Project Structure
Render (Deployment)
├── controllers/
├── models/
├── routers/
├── views/
│   ├── includes/
│   ├── layouts/
│   └── listings/
├── public/
│   ├── css/
│   ├── js/
│   └── Icon/
├── utils/
├── middleware.js
├── app.js
├── package.json
└── README.md
⚙️ Environment Variables
MONGO_URL=your_mongodb_connection_string
MAP_TOKEN=your_mapbox_public_token
SECRET=your_session_secret
NODE_ENV=production
