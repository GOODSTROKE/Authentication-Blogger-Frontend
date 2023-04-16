import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../features/global/globalSlice'
import useTheme from '../../hooks/useTheme'
import { Link } from 'react-router-dom'
import HeaderLogo from './../../assets/images/logos/logo.png'
import DropDownLink from '../ui/DropDownLink'
import { profileTree } from './../../utils/data'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const isDark = useTheme()

  const darkModeToggler = () => {
    if (isDark) {
      localStorage.setItem('theme', 'light')
      dispatch(setTheme('light'))
    } else {
      localStorage.setItem('theme', 'dark')
      dispatch(setTheme('dark'))
    }
  }

  return (
    <div className='header-container relative flex w-full bg-white dark:bg-navy-700 print:hidden'>
      {/* Header Items */}
      <div className='flex w-full items-center justify-between'>
        {/* Left: Sidebar Toggle Button */}
        <Link to='/' className='flex  items-center space-x-4'>
          <div>
            <img className='h-10 w-10 rounded' src={HeaderLogo} alt='logo' />
          </div>
        </Link>

        {/* Right: Header buttons */}
        <div className='-mr-1.5 flex items-center space-x-2'>
          {/* ADD BLOG BTN */}
          <Link
            to='/?tab=add_blog'
            class='btn bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
          >
            NEW POST
          </Link>
          {/* Dark Mode Toggle */}
          <button className='btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25'>
            {isDark ? (
              <svg
                onClick={darkModeToggler}
                className='h-6 w-6 text-amber-400 transition-transform duration-200 ease-out absolute origin-top'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M11.75 3.412a.818.818 0 01-.07.917 6.332 6.332 0 00-1.4 3.971c0 3.564 2.98 6.494 6.706 6.494a6.86 6.86 0 002.856-.617.818.818 0 011.1 1.047C19.593 18.614 16.218 21 12.283 21 7.18 21 3 16.973 3 11.956c0-4.563 3.46-8.31 7.925-8.948a.818.818 0 01.826.404z' />
              </svg>
            ) : (
              <svg
                onClick={darkModeToggler}
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-amber-400 transition-transform duration-200 ease-out absolute origin-top'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </button>

          {/* User Dropdown */}
          <DropDownLink data={profileTree}>
            <div class='avatar h-10 w-10'>
              <img class='rounded-full' src={user?.avatar} alt='avatar' />
            </div>
          </DropDownLink>
        </div>
      </div>
    </div>
  )
}

export default Header
