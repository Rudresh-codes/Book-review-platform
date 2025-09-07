# 📚 Book Review Platform

A full-stack MERN application where users can explore books, add reviews, and manage content with role-based access (admin vs normal users).

🚀 Live Demo: [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
🌐 API: [https://your-backend.vercel.app/api](https://your-backend.vercel.app/api)

---

## ✨ Features

* 🔐 **Authentication & Authorization**

  * User registration & login with JWT.
  * Role-based access (only admins can add books).
* 📖 **Books Management**

  * Browse all books.
  * View single book details with reviews.
  * Admins can add new books.
* ⭐ **Reviews**

  * Users can submit reviews on books.
  * Each review is tied to a user.
* ⚡ **Frontend**

  * Built with **React + Vite + TailwindCSS**.
  * Private routes (only authenticated users can access `/books`).
* ☁️ **Backend**

  * **Express.js + MongoDB Atlas**.
  * Organized routes/controllers.
  * JWT authentication middleware.

---

## 🏗️ Tech Stack

* **Frontend:** React, Vite, TailwindCSS, React Router
* **Backend:** Node.js, Express.js, MongoDB (Mongoose)
* **Auth:** JWT
* **Deployment:** Vercel (frontend & backend)

---

## ⚙️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/Rudresh-codes/Book-review-platform
cd Book-review-platform
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=4000
```

Run locally:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd .. # root directory
npm install
```

Create a `.env` file inside root:

```env
VITE_API_URL=http://localhost:4000
```

Run locally:

```bash
npm run dev
```

---

### 4. Deployment

* Frontend → Deploy to Vercel, set `VITE_API_URL` in project settings to your backend URL.
* Backend → Deploy to Vercel, place `MONGO_URI`, `JWT_SECRET`, and `JWT_EXPIRES_IN` in Vercel Environment Variables.

---

## 🔑 Demo Credentials

| Role  | Email                                     | Password |
| ----- | ----------------------------------------- | -------- |
| Admin | [admin@admin.com](mailto:admin@admin.com) | admin123 |
| User  | [user@test.com](mailto:user@test.com)     | user123  |

---


## 💡 Future Improvements

* ✅ User profile pages.
* ✅ Like/save reviews.
* ✅ Pagination & infinite scroll.

---

⚡ Built with ❤️ by [Rudresh](https://github.com/Rudresh-codes)

---

