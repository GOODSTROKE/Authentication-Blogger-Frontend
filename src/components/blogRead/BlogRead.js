import React from 'react'
import moment from 'moment/moment'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGetBlogQuery } from '../../features/blog/blogApi'
import Loader from './../ui/Loader'
import Error from '../ui/Error'

const BlogRead = () => {
  const search = useLocation().search
  const id = new URLSearchParams(search).get('id')

  const navigate = useNavigate()
  const { data: blog, isLoading, isError } = useGetBlogQuery(id)

  React.useEffect(() => {
    if (!id) navigate('/')
  }, [id])

  console.log({ blog })

  return (
    <main class='w-full'>
      {isLoading ? (
        <Loader />
      ) : isError || !blog._id ? (
        <Error message='NO Blog Found!' />
      ) : (
        <div class='card py-4'>
          <div class='p-2.5'>
            <img
              src={blog?.banner}
              class='h-72 w-full lg:w-3/5 lg:mx-auto rounded-lg object-cover object-center'
              alt='banner'
            />
          </div>
          <div class='flex grow flex-col px-4 pb-5 pt-1 text-center sm:px-5 lg:w-3/5 lg:mx-auto'>
            <div>
              <span class='text-xs+ text-info'>{blog?.category}</span>
            </div>
            <div class='mt-1'>
              <span class='text-lg font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light'>
                {blog?.title}
              </span>
            </div>
            <div class='my-2 flex items-center space-x-3 text-xs'>
              <div class='h-px flex-1 bg-slate-200 dark:bg-navy-500'></div>
              <p>{moment(blog?.createdAt).fromNow()}</p>
              <div class='h-px flex-1 bg-slate-200 dark:bg-navy-500'></div>
            </div>
            <p class='my-2 grow text-left line-clamp-3'>{blog?.description}</p>
            <div>
              <Link
                to='/'
                class='btn mt-4 rounded-full bg-primary font-medium text-white hover:bg-primary-focus hover:shadow-lg hover:shadow-primary/50 focus:bg-primary-focus focus:shadow-lg focus:shadow-primary/50 active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:hover:shadow-accent/50 dark:focus:bg-accent-focus dark:focus:shadow-accent/50 dark:active:bg-accent/90'
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default BlogRead
