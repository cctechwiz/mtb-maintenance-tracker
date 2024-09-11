import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements
} from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import Dashboard from './pages/Dashboard.jsx'
import Builds from './pages/Builds.jsx'
import Parts from './pages/Parts.jsx'
import Rides from './pages/Rides.jsx'
import Maintenance from './pages/Maintenance.jsx'
import Auth from './pages/Auth.jsx'
import Settings from './pages/Settings.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path='/builds' element={<Builds />} />
      <Route path='/parts' element={<Parts />} />
      <Route path='/rides' element={<Rides />} />
      <Route path='/maintenance' element={<Maintenance />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/auth' element={<Auth />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
