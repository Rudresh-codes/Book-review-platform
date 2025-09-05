import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Allbooks from './components/Allbooks.jsx'
import Home from './components/Home.jsx'
import { Route, createRoutesFromElements } from 'react-router-dom'
import  Book  from './components/Book.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='Book' element={<Allbooks />} />
      <Route path='Book/:bookid' element={<Book />} />
      {/* <Route path='contact' element={<Contact />} />
      <Route 
      loader={githubInfoLoader}
      path='github' 
      element={<Github />}
       /> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
