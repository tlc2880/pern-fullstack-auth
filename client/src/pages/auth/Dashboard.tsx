import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unauthenticateUser } from '../../redux/slices/authSlice'
import { fetchProtectedInfo, onLogout } from '../../api/auth';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import InputTodo from "../todo/InputTodo";
import ListTodos  from "../todo/ListTodos";
import Layout from '../../components/Layout';

function Dashboard() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, protectedDataSet] = useState(null);

  const logout = async () => {
    try {
      await onLogout()
      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error: any) {
        console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      // eslint-disable-next-line
      const { data } = await fetchProtectedInfo()
      protectedDataSet(data.info)
      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  },)

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Dashboard</h1>
        <h2>{protectedData}</h2>
        <button onClick={() => logout()} className="btn btn-primary">
          Logout
        </button>
        <CssBaseline />
        <Container maxWidth="md">
          <h1 className="input-header" >PERN Todo using Redux Toolkit with Authorization</h1>
          < InputTodo />
          < ListTodos />  
        </Container>
      </Layout>
    </div>
  )
}

export default Dashboard;