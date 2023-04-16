import React from 'react'
import { useSelector } from 'react-redux'
import { useGetActiveSessionsQuery } from '../../features/auth/authApi'
import Loader from '../ui/Loader'
import Error from '../ui/Error'
import LinkedDevicesItem from './LinkedDevicesItem'

const LinkedDeivces = () => {
  const { user } = useSelector((state) => state.auth)
  const { data, isLoading, isError, error } = useGetActiveSessionsQuery(
    user?._id
  )

  return (
    <div className=' mt-5 card'>
      <div className='flex flex-col items-center space-y-4 border-b border-slate-200 p-4 dark:border-navy-500 sm:flex-row sm:justify-between sm:space-y-0 sm:px-5'>
        <h2 className='text-lg font-medium tracking-wide text-slate-700 dark:text-navy-100'>
          Device Activity
        </h2>
      </div>
      <div className='p-4 sm:p-5'>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error message={error?.data?.message} />
        ) : data?.length === 0 ? (
          <Error message='No Data Found' />
        ) : (
          <div className='is-scrollbar-hidden min-w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500'>
            <table className='w-full text-left'>
              <thead>
                <tr>
                  <th className='whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5'>
                    Serial
                  </th>
                  <th className='whitespace-nowrap border border-t-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5'>
                    Platform
                  </th>
                  <th className='whitespace-nowrap border border-t-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5'>
                    Time
                  </th>
                  <th className='whitespace-nowrap border border-t-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((device, index) => (
                  <LinkedDevicesItem
                    key={device?._id}
                    device={device}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
export default LinkedDeivces
