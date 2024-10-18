import React from 'react'
import App from './App'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Root() {
  return (
    <div className="container">
      <BrowserRouter>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={false}
          limit={1}
          autoClose={4000}
        />
        <App />
      </BrowserRouter>
    </div>
  )
}

export default Root
