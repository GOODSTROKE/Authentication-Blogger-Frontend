import React from 'react'
import { Formik } from 'formik'
import toast from 'react-hot-toast'
import { useUpdateBlogMutation } from '../../features/blog/blogApi'

const UpdateBlog = ({ id, modalHandler, data }) => {
  const [updateBlog, { isSuccess, isError }] = useUpdateBlogMutation()

  const updateHandler = (values, { resetForm }) => {
    updateBlog({ id, data: values })
    resetForm()
  }

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Update Success!')
      modalHandler()
    }
    if (isError) {
      toast.error('Failed to Update!')
      modalHandler()
    }
  }, [isSuccess, isError, modalHandler])

  return (
    <>
      <div className='m-2 bg-white rounded-lg shadow-lg overflow-hidden pb-4'>
        <div className='bg-indigo-500 p-4 rounded-b-full rounded-t-2xl'>
          <h1 class='text-4xl text-white'>Update Blog</h1>
        </div>
        {
          <Formik
            initialValues={{
              title: data?.title,
              description: data?.description,
            }}
            onSubmit={updateHandler}
          >
            {({ handleChange, handleSubmit, values }) => (
              <div className='py-6 px-8'>
                <form
                  onSubmit={handleSubmit}
                  className=' text xs lg:text-sm text text-gray-600 space-y-2'
                >
                  <div className='space-y-2'>
                    <label className='block text-left font-semibold'>
                      Blog title
                    </label>
                    <input
                      type='text'
                      name='title'
                      value={values.title}
                      placeholder='Blog Title'
                      onChange={handleChange}
                      className='form-input w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-left font-semibold'>
                      Blog Description
                    </label>
                    <textarea
                      type='text'
                      name='description'
                      value={values.description}
                      placeholder='Blog Description'
                      onChange={handleChange}
                      className='form-textarea w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent'
                      required
                    />
                  </div>
                  <div className='space-x-4'>
                    <button
                      onClick={modalHandler}
                      class='btn bg-info font-medium text-white hover:bg-info-focus hover:shadow-lg hover:shadow-info/50 focus:bg-info-focus focus:shadow-lg focus:shadow-info/50 active:bg-info-focus/90'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      class='btn bg-success font-medium text-white hover:bg-success-focus hover:shadow-lg hover:shadow-success/50 focus:bg-success-focus focus:shadow-lg focus:shadow-success/50 active:bg-success-focus/90'
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Formik>
        }
      </div>
    </>
  )
}

export default UpdateBlog
