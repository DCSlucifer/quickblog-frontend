import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {

    // State management
    const [comments, setComments] = useState([]) // Store all comments from API
    const [filter, setFilter] = useState('Not Approved') // Track current filter status

    const {axios} = useAppContext();

    // Fetch comments from API
    const fetchComments = async ()=>{
        try {
          const { data } = await axios.get('/api/admin/comments')
          data.success ? setComments(data.comments) : toast.error(data.message)
        } catch (error) {
          toast.error(error.message)
        }
    }

    // Fetch comments on component mount
    useEffect(()=>{
        fetchComments()
    },[])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      {/* Header with title and filter buttons */}
      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comments</h1>
        <div className='flex gap-4'>
            {/* Filter: Approved comments */}
            <button onClick={()=> setFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary' : 'text-gray-700'}`}>Approved</button>

            {/* Filter: Not approved comments */}
            <button onClick={()=> setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'}`}>Not Approved</button>
        </div>
      </div>

      {/* Comments table */}
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className="w-full text-sm text-gray-500">
            {/* Table header */}
            <thead className="text-xs text-gray-700 text-left uppercase">
                <tr>
                    <th scope="col" className="px-6 py-3"> Blog Title & Comment </th>
                    <th scope="col" className="px-6 py-3 max-sm:hidden"> Date </th>
                    <th scope="col" className="px-6 py-3"> Action </th>
                </tr>
            </thead>
            {/* Table body - filtered comments */}
            <tbody>
                {comments.filter((comment)=>{
                    // Filter by approval status
                    if(filter === "Approved") return comment.isApproved === true;
                    return comment.isApproved === false;
                }).map((comment, index)=> <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />)}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
