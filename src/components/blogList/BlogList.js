import React from 'react'
import { useGetBlogsQuery } from '../../features/blog/blogApi'
import Loader from '../ui/Loader'
import BlogListItem from './BlogListItem'
import Error from '../ui/Error'
import BlogListHeader from './BlogListHeader'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const { search } = useSelector((state) => state.blog)
  const { data: blogs, isLoading, isError } = useGetBlogsQuery()
  const regex = new RegExp(search, 'i')
  const filtered = search
    ? blogs.filter((item) => regex.test(item?.title || item?.category))
    : blogs

  return (
    <main class='w-full'>
      {/* Blog List Header */}
      <BlogListHeader />
      <div class='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6'>
        {/* Blog Items */}
        {isLoading ? (
          <Loader />
        ) : isError || !filtered.length ? (
          <Error message="NO Blog's Found!" />
        ) : (
          filtered.map((blog) => <BlogListItem key={blog?._id} blog={blog} />)
        )}
      </div>
    </main>
  )
}

export default BlogList
