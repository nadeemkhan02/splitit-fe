import React from 'react'
import { ROUTE_PATH } from '../utils/routes'
import Home from '../pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'

const App = () => {
  const isLogedIn = localStorage.getItem('user')
  console.log(isLogedIn, '<<')
  return (
    <div>
      {isLogedIn ? (
        <Routes>
          <Route
            path={'*'}
            element={<Navigate replace to={ROUTE_PATH.DASHBOARD} />}
          />
          <Route path={ROUTE_PATH.DASHBOARD} element={<Dashboard />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={ROUTE_PATH.Home} element={<Home />}></Route>
          <Route path={ROUTE_PATH.SIGN_IN} element={<SignIn />}></Route>
          <Route path={ROUTE_PATH.SIGN_UP} element={<SignUp />}></Route>
          <Route
            path={'*'}
            element={<Navigate replace to={ROUTE_PATH.Home} />}
          />
        </Routes>
      )}
    </div>
  )
}

export default App
