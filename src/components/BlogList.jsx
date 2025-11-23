import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {

    const [menu, setMenu] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const blogsPerPage = 12 // Show 12 blogs per page

    const {blogs, input} = useAppContext()

    const filteredBlogs = ()=>{
      if(input === ''){
        return blogs
      }
      return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

    // Filter by category
    const categoryFilteredBlogs = filteredBlogs().filter((blog)=> menu === "All" ? true : blog.category === menu)

    // Pagination logic
    const totalBlogs = categoryFilteredBlogs.length
    const totalPages = Math.ceil(totalBlogs / blogsPerPage)
    const indexOfLastBlog = currentPage * blogsPerPage
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
    const currentBlogs = categoryFilteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)

    // Reset to page 1 when category changes
    const handleCategoryChange = (category) => {
      setMenu(category)
      setCurrentPage(1)
    }

    // Page navigation - scroll to blog grid smoothly
    const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber)
      // Scroll to blog grid section
      const blogGrid = document.getElementById('blog-grid')
      if (blogGrid) {
        const gridTop = blogGrid.offsetTop - 100 // 100px offset for header
        window.scrollTo({ top: gridTop, behavior: 'smooth' })
      }
    }

  return (
    <div>
      {/* Category Filter */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item)=> (
            <div key={item} className='relative'>
                <button onClick={()=> handleCategoryChange(item)}
                 className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
                    {item}
                    {menu === item && (
                        <motion.div layoutId='underline'
                        transition={{type: 'spring', stiffness: 500, damping: 30}}
                        className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'></motion.div>
                    )}

                </button>
            </div>
        ))}
      </div>

      {/* Blog Grid - added ID for scroll target */}
      <div id="blog-grid" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-8 mx-8 sm:mx-16 xl:mx-40'>
        {currentBlogs.map((blog)=> <BlogCard key={blog._id} blog={blog}/>)}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mb-24 mx-8'>
          {/* Previous Button */}
          <button
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className='flex gap-2'>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1
              // Show first page, last page, current page, and pages around current
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`w-10 h-10 rounded-md border ${
                      currentPage === pageNumber
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={pageNumber} className='px-2 py-2'>...</span>
              }
              return null
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md border ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            Next →
          </button>
        </div>
      )}

      {/* Blog Count Info */}
      {totalBlogs > 0 && (
        <div className='text-center text-gray-500 text-sm mb-8'>
          Showing {indexOfFirstBlog + 1} - {Math.min(indexOfLastBlog, totalBlogs)} of {totalBlogs} blogs
        </div>
      )}

      {/* No Results */}
      {totalBlogs === 0 && (
        <div className='text-center text-gray-500 py-12'>
          No blogs found. Try a different category or search term.
        </div>
      )}
    </div>
  )
}

export default BlogList
