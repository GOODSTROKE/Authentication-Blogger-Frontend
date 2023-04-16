import React from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useLogoutQuery } from '../features/auth/authApi'
import UpdateProfile from './../components/updateProfile/UpdateProfile'
import UpdatePassword from './../components/updatePassword/UpdatePassword'
import LinkedDeivces from './../components/linkedDevices/LinkedDeivces'
import { useDispatch } from 'react-redux'
import Addblog from './../components/addBlog/Addblog'
import BlogList from '../components/blogList/BlogList'
import BlogRead from '../components/blogRead/BlogRead'

const HomePage = () => {
  const search = useLocation().search
  const component = new URLSearchParams(search).get('tab')

  //Logout
  const { refetch } = useLogoutQuery(undefined, {
    skip: Boolean(component !== 'logout'),
  })

  React.useEffect(() => {
    if (component === 'logout') {
      refetch()
    }
  }, [component, refetch])

  const renderSection = (params) => {
    switch (params) {
      case 'update_profile':
        return <UpdateProfile />
      case 'update_password':
        return <UpdatePassword />
      case 'linked_devices':
        return <LinkedDeivces />
      case 'add_blog':
        return <Addblog />
      case 'blog_read':
        return <BlogRead />
      default:
        return <BlogList />
    }
  }

  return <Layout>{renderSection(component)}</Layout>
}

export default HomePage
