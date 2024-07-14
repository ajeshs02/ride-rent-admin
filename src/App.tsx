import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import Layout from './layout/Layout'
import ErrorPage from './pages/ErrorPage'

// pages import
const LiveListingPage = lazy(
  () => import('./pages/live-listing/LiveListingPage')
)
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const NewUpdatesPage = lazy(() => import('./pages/new-updates/NewUpdatesPage'))
const ManageTypesPage = lazy(
  () => import('./pages/manage-types/ManageTypesPage')
)
const EditTypePage = lazy(() => import('./pages/manage-types/EditTypePage'))
const AddTypePage = lazy(() => import('./pages/manage-types/AddTypePage'))

// brands import
const ManageBrandsPage = lazy(
  () => import('./pages/manage-brands/ManageBrandsPage')
)
const AddBrandPage = lazy(() => import('./pages/manage-brands/AddBrandPage'))
const EditBrandPage = lazy(() => import('./pages/manage-brands/EditBrandPage'))

// location pages
const ManageLocationsPage = lazy(
  () => import('./pages/manage-locations/ManageLocationsPage')
)
const AddLocationPage = lazy(
  () => import('./pages/manage-locations/AddLocationPage')
)
const EditLocationPage = lazy(
  () => import('./pages/manage-locations/EditLocationPage')
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

      // categories route
      {
        path: '/manage-types',
        element: <Navigate to="/manage-types/car" />,
      },
      {
        path: '/manage-types/:category',
        element: <ManageTypesPage />,
      },
      {
        path: '/manage-types/:category/add',
        element: <AddTypePage />,
      },
      {
        path: '/manage-types/:category/edit/:typeId',
        element: <EditTypePage />,
      },

      // brands route
      {
        path: '/manage-brands',
        element: <Navigate to="/manage-brands/car" />,
      },
      { path: '/manage-brands/:category', element: <ManageBrandsPage /> },
      { path: '/manage-brands/:category/add-brand', element: <AddBrandPage /> },
      {
        path: '/manage-brands/:category/edit/:brandId',
        element: <EditBrandPage />,
      },

      // location route
      { path: '/manage-locations', element: <ManageLocationsPage /> },
      { path: '/manage-locations/add', element: <AddLocationPage /> },
      {
        path: '/manage-locations/edit/:locationId',
        element: <EditLocationPage />,
      },

      // links route
      { path: '/manage-links', element: <ManageLinksPage /> },

      // ads route
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
