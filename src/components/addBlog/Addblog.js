import React, { useEffect } from 'react'
import DrugAndDropFileUpload from '../ui/DrugAndDropFileUpload'
import { useFormik } from 'formik'
import { createBlogSchema } from '../../schema/blogSchema'
import InputText from './../inputs/InputText'
import TextArea from './../inputs/TextArea'
import { categories } from '../../utils/data'
import { useAddBlogMutation } from '../../features/blog/blogApi'
import { toast } from 'react-hot-toast'

const Addblog = () => {
  const [addBlog, { isSuccess, isError, error }] = useAddBlogMutation()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: categories[0],
      bannar: [],
    },
    validationSchema: createBlogSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const images = values.bannar.map((item) => item.file)
        let formData = new FormData()
        formData.append('banner', images[0])
        formData.append('title', values.title)
        formData.append('category', values.category)
        formData.append('description', values.description)
        addBlog(formData)
        resetForm()
      } catch (error) {
        alert(error.message)
      }
    },
  })

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Blog Added')
    }
    if (isError) {
      console.log({ error })
      toast.error('Failed to Add Blog!')
    }
  }, [isSuccess, isError])

  const { handleChange, handleSubmit, errors, values, setFieldValue } = formik

  return (
    <div class='card'>
      <div class='border-b border-slate-200 p-4 dark:border-navy-500 sm:px-5'>
        <div class='flex items-center space-x-2'>
          <div class='flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 p-1 text-primary dark:bg-accent-light/10 dark:text-accent-light'>
            <i class='fa-solid fa-layer-group'></i>
          </div>
          <h4 class='text-lg font-medium text-slate-700 dark:text-navy-100'>
            Add New Blog
          </h4>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        class='lg:w-2/3 mx-auto w-full space-y-4 p-4 sm:p-5'
      >
        <InputText
          value={values.title}
          error={errors.title}
          label='Blog Title'
          name='title'
          placeholder='Enter Blog Title'
          onChange={handleChange}
          required
        />
        <TextArea
          value={values.description}
          error={errors.description}
          label='Blog Description'
          name='description'
          placeholder='Enter Blog Description'
          onChange={handleChange}
          required
        />

        <label class='block'>
          <span>Select Category</span>
          <select
            onChange={handleChange}
            value={values.category}
            name='category'
            class='form-select mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent'
          >
            {categories.map((cat, index) => (
              <option key={index}>{cat}</option>
            ))}
          </select>
        </label>

        <div>
          <span>Add Blog Banner</span>
          <div class='mt-1.5'>
            <DrugAndDropFileUpload
              fileName='bannar'
              maxFiles={1}
              files={values.bannar}
              setFiles={setFieldValue}
            />
          </div>
        </div>
        <div class='flex justify-center space-x-2 pt-4'>
          <button class='btn space-x-2 bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'>
            <span>Add Blog Post</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addblog
