import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useDeleteBlogMutation } from '../../features/blog/blogApi'

const DeleteBlog = ({ id, modalHandler }) => {
  const [deleteBlog, { isSuccess, isError }] = useDeleteBlogMutation()

  const deleteHandler = () => {
    deleteBlog(id)
  }

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Blog Deleted!')
      modalHandler()
    }
    if (isError) {
      toast.error('Failed to Delete!')
      modalHandler()
    }
  }, [isSuccess, isError, modalHandler])

  return (
    <>
      <div className='m-2 bg-white rounded-lg shadow-lg overflow-hidden pb-4'>
        <div className='bg-indigo-500 p-8 rounded-b-full rounded-t-2xl'>
          <span>
            <i class='fa-sharp fa-regular fa-circle-xmark text-3xl text-error'></i>
          </span>
          <h1 class='text-4xl text-white'>Are you sure?</h1>
        </div>
        <div className='py-6 space-y-4 px-8'>
          <p className='text-sm text-gray-600'>
            Do you really want to delete these records? This process cannot be
            undone.
          </p>
          <div className='space-x-4'>
            <button
              className='btn bg-success font-medium text-white hover:bg-success-focus hover:shadow-lg hover:shadow-success/50 focus:bg-success-focus focus:shadow-lg focus:shadow-success/50 active:bg-success-focus/90'
              onClick={modalHandler}
            >
              Cancel
            </button>
            <button
              className='btn bg-error font-medium text-white hover:bg-error-focus hover:shadow-lg hover:shadow-error/50 focus:bg-error-focus focus:shadow-lg focus:shadow-error/50 active:bg-error-focus/90'
              onClick={() => {
                deleteHandler()
                modalHandler()
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteBlog
