import { createBrowserRouter, redirect } from 'react-router-dom'
import App from '../App'

import ReportPage from '../features/reports'
import PackagesPage from '../features/packages'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: () => {
      return redirect('/packages')
    },
  },
  {
    path: '/reports',
    element: <ReportPage />,
  },
  {
    path: '/packages',
    element: <PackagesPage />,
  },
])
