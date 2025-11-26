import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
import { data } from 'react-router-dom';

const Login = () => {

    const { axios, setToken } = useAppContext();

    // Form state management for email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Handle admin login form submission and authentication
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
          // Send login request to backend API
          const { data } = await axios.post('/api/admin/login', { email, password })

          if (data.success) {
            // Store authentication token in state and localStorage
            setToken(data.token)
            localStorage.setItem('token', data.token)
            // Set default authorization header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          }
          else {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            {/* Login header */}
            <div className='w-full py-6 text-center'>
                <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> Login</h1>
                <p className='font-light'>Enter your credentials to access the admin panel</p>
            </div>
            
            {/* Login form */}
            <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                {/* Email input */}
                <div className='flex flex-col'>
                    <label> Email </label>
                    <input 
                      onChange={(e) => setEmail(e.target.value)} 
                      value={email} 
                      type="email" 
                      required 
                      placeholder='your email id' 
                      className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                    />
                </div>
                
                {/* Password input */}
                <div className='flex flex-col'>
                    <label> Password </label>
                    <input 
                      onChange={(e) => setPassword(e.target.value)} 
                      value={password} 
                      type="password" 
                      required 
                      placeholder='your password' 
                      className='border-b-2 border-gray-300 p-2 outline-none mb-6'
                    />
                </div>
                
                {/* Submit button */}
                <button 
                  type="submit" 
                  className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'
                > 
                  Login 
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
