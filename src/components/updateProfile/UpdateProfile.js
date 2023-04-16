import { Formik } from 'formik'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../../features/user/userApi'
import { updateUserSchema } from '../../schema/userSchema'
import { SvgMailIcon } from '../../utils/svgIcons'
import InputText from '../inputs/InputText'
import UpdateAvatar from './UpdateAvatar'

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth)
  const [updateUser, { isLoading, isError, isSuccess }] =
    useUpdateUserMutation()

  function updateHandler(values, { resetForm }) {
    updateUser({ userId: user._id, data: values })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile Updated!')
    }
    if (isError) {
      toast.error('Failed to Update!')
    }
  }, [isSuccess, isError])

  return (
    <div className=' mt-5 card'>
      {/* Update Header */}
      <div className='flex flex-col items-center space-y-4 border-b border-slate-200 p-4 dark:border-navy-500 sm:flex-row sm:justify-between sm:space-y-0 sm:px-5'>
        <h2 className='text-lg font-medium tracking-wide text-slate-700 dark:text-navy-100'>
          Profile Information
        </h2>
      </div>

      {/* Update Body */}
      <div className='p-4 sm:p-5 w-full lg:w-2/3 mx-auto'>
        {/* Update Avatar */}
        <UpdateAvatar />

        <div className='my-7 h-px bg-slate-200 dark:bg-navy-500'></div>
        {/* Update Info */}
        <Formik
          initialValues={{
            name: user.name ?? '',
            email: user.email ?? '',
            mobile: user.mobile ?? '',
          }}
          validationSchema={updateUserSchema}
          onSubmit={updateHandler}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <InputText
                  value={values.name}
                  error={errors.name}
                  icon={<i className='fa-regular fa-user text-base'></i>}
                  label='Name'
                  name='name'
                  placeholder='Enter Email'
                  onChange={handleChange}
                  required
                />
                <InputText
                  value={values.mobile}
                  error={errors.mobile}
                  icon={<i className='fas fa-mobile-alt text-base'></i>}
                  label='Mobile'
                  name='mobile'
                  placeholder='Enter Mobile Number'
                  onChange={handleChange}
                  required
                />
                <InputText
                  value={values.email}
                  error={errors.email}
                  icon={SvgMailIcon}
                  label='Email'
                  name='email'
                  placeholder='Enter Email'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='my-7 h-px bg-slate-200 dark:bg-navy-500 col-sapn-2'></div>
              <button
                disabled={isLoading}
                type='submit'
                className='btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
              >
                Update
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateProfile
