import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import Layout from './layout/Layout'
import ErrorPage from './pages/ErrorPage'

// pages import
const LiveListingPage = lazy(
  () => import('./pages/list-listing/LiveListingPage')
)
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const NewUpdatesPage = lazy(() => import('./pages/new-updates/NewUpdatesPage'))
const ManageCategoriesPage = lazy(
  () => import('./pages/manage-categories/ManageCategoriesPage')
)
const EditTypePage = lazy(
  () => import('./pages/manage-categories/EditTypePage')
)
const AddTypePage = lazy(() => import('./pages/manage-categories/AddTypePage'))

const ManageBrandsPage = lazy(
  () => import('./pages/manage-brands/ManageBrandsPage')
)
const ManageLocationsPage = lazy(
  () => import('./pages/manage-locations/ManageLocationsPage')
)
const ManageLinksPage = lazy(
  () => import('./pages/manage-links/ManageLinksPage')
)
const ManageAdsPage = lazy(() => import('./pages/manage-ads/ManageAdsPage'))

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/live-listing', element: <LiveListingPage /> },
      { path: '/new-updates', element: <NewUpdatesPage /> },
      {
        path: '/manage-categories',
        element: <Navigate to="/manage-categories/car" />,
      },
      {
        path: '/manage-categories/:category',
        element: <ManageCategoriesPage />,
      },
      {
        path: '/manage-categories/:category/add',
        element: <AddTypePage />,
      },
      {
        path: '/manage-categories/:category/edit/:typeId',
        element: <EditTypePage />,
      },
      { path: '/manage-brands', element: <ManageBrandsPage /> },
      { path: '/manage-locations', element: <ManageLocationsPage /> },
      { path: '/manage-links', element: <ManageLinksPage /> },
      { path: '/manage-ads', element: <ManageAdsPage /> },
    ],
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
