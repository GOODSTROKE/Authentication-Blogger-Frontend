import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useUpdateAvatarMutation } from '../../features/user/userApi'
import { updateAvatarSchema } from '../../schema/userSchema'

const UpdateAvatar = () => {
  const { user } = useSelector((state) => state.auth)

  const [updateAvatar, { isLoading, isError, isSuccess }] =
    useUpdateAvatarMutation()

  const [avatar, setAvatar] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      avatar: null,
    },
    validationSchema: updateAvatarSchema,
    onSubmit: (values) => {
      let formData = new FormData()
      formData.append('avatar', values.avatar)
      updateAvatar({ userId: user._id, data: formData })
    },
  })

  const { setFieldValue, handleSubmit, errors } = formik

  React.useEffect(() => {
    if (isSuccess) {
      setAvatar(false)
      toast.success('Avatar Updated!')
    }
    if (isError) {
      setAvatar(false)
      toast.error('Failed to Update Avatar!')
    }
  }, [isSuccess, isError])

  return (
    <div className='flex flex-col'>
      <span className='text-base font-medium text-slate-600 dark:text-navy-100'>
        Avatar
      </span>
      <div className='flex flex-row items-center space-x-6'>
        <div className='avatar mt-1.5 h-20 w-20'>
          <img
            className='mask is-diamond'
            src={avatar ? avatar : user?.avatar}
            alt='avatar'
          />
          <label
            htmlFor='profilePicture'
            className='absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white dark:bg-navy-700'
          >
            <div className='btn h-6 w-6 rounded-full border border-slate-200 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:border-navy-500 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
              </svg>
            </div>
          </label>
          <input
            id='profilePicture'
            type='file'
            name='avatar'
            className='hidden'
            onChange={(event) => {
              setFieldValue('avatar', event.target.files[0])
              setAvatar(URL.createObjectURL(event.target.files[0]))
            }}
          />
        </div>
        {/* Action Buttons */}
        <div
          className={`flex justify-center space-x-2 ${
            !errors?.avatar && avatar ? 'block' : 'hidden'
          } `}
        >
          <button
            className='btn min-w-[7rem] border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90'
            onClick={() => setAvatar(false)}
          >
            Cancel
          </button>
          <button
            className='btn min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Update
          </button>
        </div>

        <div>
          {errors && errors?.avatar && (
            <span className='text-tiny+ text-error'>{errors?.avatar}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default UpdateAvatar
