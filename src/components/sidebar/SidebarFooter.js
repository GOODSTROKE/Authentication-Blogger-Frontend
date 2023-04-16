import React from 'react'
import { Link } from 'react-router-dom'

const SidebarFooter = () => {
  return (
    <Link class='mt-3 px-4 mb-3' to={`/?tab=logout`}>
      <button class='btn h-9 w-full space-x-2 bg-primary text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          class='h-5 w-5'
          fill='none'
          viewbox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='1.5'
            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
          />
        </svg>
        <span>Logout</span>
      </button>
    </Link>
  )
}

export default SidebarFooter
