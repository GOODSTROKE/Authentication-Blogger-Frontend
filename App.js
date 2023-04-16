import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Theme from './components/layout/Theme'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFound from './pages/NotFound'
import useAuthCheck from './hooks/useAuthCheck'
import Loader from './components/ui/Loader'
import PrivateRoute from './AuthRoutes/PrivateRoute'
import PublicRoute from './AuthRoutes/PublicRoute'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  const authCheck = useAuthCheck()
  return !authCheck ? (
    <Loader />
  ) : (
    <Theme>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Theme>
  )
}

export default App
