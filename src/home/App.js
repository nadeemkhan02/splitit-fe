import React from 'react'
import { ROUTE_PATH } from '../utils/routes'
import Home from '../pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Trips from '../pages/Trips'
import Friends from '../pages/Friends'
import History from '../pages/History'

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
          <Route path={ROUTE_PATH.TRIPS} element={<Trips />} />
          <Route path={ROUTE_PATH.FRIENDS} element={<Friends />} />
          <Route path={ROUTE_PATH.HISTORY} element={<History />} />
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
