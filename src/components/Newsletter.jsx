import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Newsletter = () => {
  // Form state management
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { axios } = useAppContext()

  // Handle newsletter subscription form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Send subscription request to backend API
      const { data } = await axios.post('/api/subscriber/subscribe', { email })

      if (data.success) {
        toast.success(data.message)
        setEmail('') // Clear input on success
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      // Handle error with fallback message
      const errorMessage = error.response?.data?.message || 'Subscription failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      {/* Newsletter heading and description */}
      <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>
      
      {/* Subscription form */}
      <form 
        onSubmit={handleSubmit} 
        className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'
      >
        {/* Email input field */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500'
          type="email"
          placeholder='Enter your email id'
          required
          disabled={loading}
        />
        
        {/* Subscribe button with loading state */}
        <button
          type='submit'
          disabled={loading}
          className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  )
}

export default Newsletter
