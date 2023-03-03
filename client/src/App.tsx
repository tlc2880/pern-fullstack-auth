import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Register from './pages/auth/Register'
import Home from './pages/auth/Home'
import Login from './pages/auth/Login'
import Dashboard from './pages/auth/Dashboard'
import Cancel from './pages/eCom/Cancel'
import Success from './pages/eCom/Success'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state: any) => state.auth)
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state: any) => state.auth)
  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;