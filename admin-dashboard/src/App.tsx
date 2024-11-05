
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'

function App() {

   const router = createBrowserRouter([
      {
        path:"/",
        element: <AdminLogin/>
      }
    ])
  return (
   <RouterProvider router={router}/>
  )
}

export default App
