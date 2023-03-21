import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unauthenticateUser } from '../../redux/slices/authSlice'
import { fetchProtectedInfo, onLogout } from '../../api/auth';
import { CssBaseline, Container, Button } from "@mui/material";
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
        <h2>Dashboard</h2>
        <h3>{protectedData}</h3>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => logout()}
          style = {{
            backgroundColor: "blue",
            margin: "5px"
          }}
        >
          Logout
        </Button>
        <CssBaseline />
        <Container maxWidth="md">
          <h2 className="input-header" >PERN Todo using Redux Toolkit with Authorization</h2>
          <InputTodo />
          <ListTodos />  
        </Container>
      </Layout>
    </div>
  )
}

export default Dashboard;