import axios from 'axios'
import { toastMessage } from '../common/ToastMessage'

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.103:3001', // Replace with your API base URL
})

// Request interceptor to append the x-auth-token header
axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).token
      : null // Assuming the token is stored in the 'user' object in localStorage

    if (token) {
      request.headers['x-auth-token'] = token // Append the token to the request headers
    }
    return request // Return the modified request
  },
  (error) => {
    toastMessage('error', 'Something went wrong!')
    return Promise.reject(error) // Handle request error
  }
)

export default axiosInstance
