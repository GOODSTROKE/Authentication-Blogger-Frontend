import React from 'react'

const LoginLayout = ({ children }) => {
  return (
    <div className='min-h-100vh flex grow bg-slate-50 dark:bg-navy-900'>
      <main className='grid w-full grow grid-cols-1 place-items-center'>
        <div className='w-full max-w-[26rem] p-4 sm:px-5'>{children}</div>
      </main>
    </div>
  )
}

export default LoginLayout
