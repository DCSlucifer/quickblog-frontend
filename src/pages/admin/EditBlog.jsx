import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets, blogCategories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const EditBlog = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { axios } = useAppContext()

    const [isUpdating, setIsUpdating] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [image, setImage] = useState(false);
    const [existingImage, setExistingImage] = useState('');
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`/api/blog/${id}`);

                if (data.success) {
                    const blog = data.blog;
                    setTitle(blog.title);
                    setSubTitle(blog.subTitle || '');
                    setDescription(blog.description || '');
                    setCategory(blog.category);
                    setIsPublished(blog.isPublished);
                    setExistingImage(blog.image);
                } else {
                    toast.error(data.message);
                    navigate('/admin/listBlog');
                }
            } catch (error) {
                toast.error('Failed to load blog');
                navigate('/admin/listBlog');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsUpdating(true)

            const blog = {
                title,
                subTitle,
                description,
                category,
                isPublished
            }

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))

            if (image) {
                formData.append('image', image)
            }

            const { data } = await axios.put(`/api/blog/update/${id}`, formData);

            if (data.success) {
                toast.success(data.message);
                navigate('/admin/listBlog');
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message || 'Failed to update blog');
            }
        } finally {
            setIsUpdating(false)
        }
    }

    if (isLoading) {
        return (
            <div className='flex-1 bg-blue-50/50 text-gray-600 h-full flex items-center justify-center'>
                <div className='text-center'>
                    <div className='w-12 h-12 rounded-full border-4 border-t-blue-500 animate-spin mx-auto'></div>
                    <p className='mt-4'>Loading blog...</p>
                </div>
            </div>
        )
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <h1 className='text-2xl font-semibold mb-6'>Edit Blog</h1>

        <p>Upload new thumbnail (optional)</p>
        <label htmlFor="image">
            <img
              src={!image ? (existingImage || assets.upload_area) : URL.createObjectURL(image)}
              alt=""
              className='mt-2 h-16 rounded cursor-pointer'
            />
            <input
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
                  if (!allowedTypes.includes(file.type)) {
                    toast.error('Invalid file type. Only JPEG, PNG, WebP and GIF images are allowed.');
                    e.target.value = '';
                    return;
                  }
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error('File too large. Maximum size is 5MB');
                    e.target.value = '';
                    return;
                  }
                  setImage(file);
                }
              }}
              type="file"
              id='image'
              hidden
            />
        </label>
        {existingImage && !image && (
            <p className='text-xs text-gray-500 mt-1'>Current image will be kept if you don't upload a new one</p>
        )}

        <p className='mt-4'>Blog title</p>
        <input
          type="text"
          placeholder='Type here'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className='mt-4'>Sub title</p>
        <input
          type="text"
          placeholder='Type here'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className='mt-4'>Blog Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Type your blog description here...'
          required
          className='w-full max-w-lg mt-2 p-3 border border-gray-300 outline-none rounded min-h-[300px] font-mono text-sm'
          rows={15}
        />

        <p className='mt-4'>Blog category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          name="category"
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
        >
            {blogCategories.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
            })}
        </select>

        <div className='flex gap-2 mt-4'>
            <p>Published</p>
            <input
              type="checkbox"
              checked={isPublished}
              className='scale-125 cursor-pointer'
              onChange={(e) => setIsPublished(e.target.checked)}
            />
        </div>

        <div className='flex gap-4 mt-8'>
            <button
              disabled={isUpdating}
              type="submit"
              className='w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm disabled:bg-gray-400'
            >
                {isUpdating ? 'Updating...' : 'Update Blog'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/listBlog')}
              className='w-40 h-10 bg-gray-300 text-gray-700 rounded cursor-pointer text-sm'
            >
                Cancel
            </button>
        </div>

      </div>
    </form>
  )
}

export default EditBlog
