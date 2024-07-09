import Navbar from '@/components/general/Navbar'
import Sidebar from '@/components/general/Sidebar'
import MainWrapper from '@/components/general/MainWrapper'
import { AdminProvider } from '@/context/AdminContext'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <AdminProvider>
      <Navbar />
      <Sidebar />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </AdminProvider>
  )
}
