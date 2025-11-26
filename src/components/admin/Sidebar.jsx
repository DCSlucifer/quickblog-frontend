import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
      {/* Admin navigation sidebar - contains main menu links for admin panel */}

      {/* Dashboard link - Overview of blog statistics */}
      <NavLink 
        end={true} 
        to='/admin' 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}
      >
        <img src={assets.home_icon} alt="" className='min-w-4 w-5 '/>
        <p className='hidden md:inline-block'>Dashboard</p>
      </NavLink>

      {/* Add Blog link - Create new blog post */}
      <NavLink 
        to='/admin/addBlog' 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}
      >
        <img src={assets.add_icon} alt="" className='min-w-4 w-5 '/>
        <p className='hidden md:inline-block'>Add blogs</p>
      </NavLink>

      {/* Blog List link - View and manage all blog posts */}
      <NavLink 
        to='/admin/listBlog' 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}
      >
        <img src={assets.list_icon} alt="" className='min-w-4 w-5 '/>
        <p className='hidden md:inline-block'>Blog lists</p>
      </NavLink>

      {/* Comments link - Moderate and approve user comments */}
      <NavLink 
        to='/admin/comments' 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}
      >
        <img src={assets.comment_icon} alt="" className='min-w-4 w-5 '/>
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>

    </div>
  )
}

export default Sidebar
