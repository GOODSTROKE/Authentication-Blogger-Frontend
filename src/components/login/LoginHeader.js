import React from 'react'
import AppLogo from './../../assets/images/logos/logo.png'

const LoginHeader = ({ title, desc }) => {
  return (
    <div className='text-center'>
      <img className='mx-auto h-16 w-16 rounded-lg' src={AppLogo} alt='logo' />
      <div className='mt-4'>
        <h2 className='text-2xl font-semibold text-slate-600 dark:text-navy-100'>
          {title}
        </h2>
        <p className='text-slate-400 dark:text-navy-300'>{desc}</p>
      </div>
    </div>
  )
}

export default LoginHeader
