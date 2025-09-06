import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Route, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Allbooks from './components/Allbooks.jsx'
import Home from './components/Home.jsx'
import  Book  from './components/Book.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path="books" element={<Allbooks />} />
        <Route path="books/:bookid" element={<Book />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="add-book" element={<div className="p-6 text-white">Add Book Page</div>} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
