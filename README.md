# 🎮 Gaming Hub Platform

A centralized web application that gives users access to multiple games from a single platform. Built using Node.js and MongoDB, with secure JWT-based authentication and a clean, responsive frontend built with HTML, CSS, and JavaScript.

---

## 🚀 Features

- 🕹️ **Play from One Place**: Access a curated collection of online games from a single dashboard.
- 🔐 **JWT Authentication**: Secure login system with token verification and route protection.
- ☁️ **MongoDB Atlas**: Cloud-based database for storing user credentials and game history.
- 📱 **Responsive Design**: Clean and intuitive UI compatible with all device sizes.
- 📂 **Modular Structure**: Scalable backend and frontend architecture.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas  
- **Authentication**: JSON Web Token (JWT)  
- **Hosting**: _You can deploy on Vercel / Render / Railway_

---

## 📂 Folder Structure 

```bash
gaming-hub/
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── models/
│ └── middleware/
├── frontend/
│ ├── main.html
│ ├── styles.css
│ └── scripts.js
├── .env
└── README.md
```
```yaml

---

## ⚙️ Getting Started

### ✅ Prerequisites

Make sure you have:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)

```

### 📦 Installation

#### 1. Clone the Repo

```bash
git clone https://github.com/manyugoyal/GAMING-HUB.git
```
2. Backend Setup
 ```bash
 cd GAMIG_HUB/backend
npm install
```
Create a .env file in backend/:

```ini
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```
start the server

```bash
node server.js
```
3. Frontend
Open frontend/main.html in your browser.

You can also serve it using Live Server in VS Code or host it.

🧪 Sample JWT Auth Routes

1.POST /api/register → Register a user

2.POST /api/login → Login with email/password

3.GET /api/profile → Get user data (JWT required)

✨ Future Improvements

1.Game leaderboard tracking

2.User profile page

3.Add multiplayer support



