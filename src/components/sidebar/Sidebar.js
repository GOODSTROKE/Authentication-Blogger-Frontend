import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarList from './SidebarList'
import { sidebarTree } from '../../utils/data'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => {
  return (
    <div className='sidebar-panel'>
      <div className='flex h-full grow flex-col bg-white pl-4 dark:bg-navy-750'>
        {/* Sidebar Panel Header */}
        <SidebarHeader />
        {/* Sidebar Panel Body */}
        <SidebarList data={sidebarTree} />
        {/* Sidebar Footer */}
        <SidebarFooter />
      </div>
    </div>
  )
}

export default Sidebar
