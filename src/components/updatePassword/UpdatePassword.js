import { Formik } from 'formik'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useUpdatePasswordMutation } from '../../features/user/userApi'
import { updatePasswordSchema } from '../../schema/userSchema'
import { SvgLockIcon } from '../../utils/svgIcons'
import InputPassword from '../inputs/InputPassword'

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.auth)
  const [updatePassword, { isLoading, isError, isSuccess, error }] =
    useUpdatePasswordMutation()

  function updateHandler(values, { resetForm }) {
    // delete values?.remember
    updatePassword({ userId: user._id, data: values })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password Updated!')
    }
    if (isError) {
      toast.error(error.data.message)
    }
  }, [isSuccess, isError, error])

  return (
    <div className='mt-5 card'>
      {/* Update Header */}
      <div className='flex flex-col items-center space-y-4 border-b border-slate-200 p-4 dark:border-navy-500 sm:flex-row sm:justify-between sm:space-y-0 sm:px-5'>
        <h2 className='text-lg font-medium tracking-wide text-slate-700 dark:text-navy-100'>
          Update Password
        </h2>
      </div>
      {/* Update body */}
      <div className='p-4 sm:p-5 w-full lg:w-1/2 mx-auto'>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={updatePasswordSchema}
          onSubmit={updateHandler}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 gap-4 '>
                <InputPassword
                  value={values.currentPassword}
                  error={errors.currentPassword}
                  icon={SvgLockIcon}
                  label='Current Password'
                  name='currentPassword'
                  placeholder='Enter Current password'
                  onChange={handleChange}
                  required
                />
                <InputPassword
                  value={values.newPassword}
                  error={errors.newPassword}
                  icon={SvgLockIcon}
                  label='New Password'
                  name='newPassword'
                  placeholder='Enter New password'
                  onChange={handleChange}
                  required
                />
                <InputPassword
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  icon={SvgLockIcon}
                  label='Confirm Password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
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

export default UpdatePassword
