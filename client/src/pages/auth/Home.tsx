import { Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// import InputTodo from "../todo/InputTodo";
import ListTodos  from "../todo/ListTodos";
import Layout from '../../components/Layout';

function Home() {
  return (
    <Layout>
     <Fragment>
       <CssBaseline />
       <Container maxWidth="md">
         <h1 className="input-header" >PERN Todo using Redux Toolkit with Authorization</h1>
         {/* < InputTodo />*/}
         < ListTodos />  
       </Container>
     </Fragment>
    </Layout>
  );
}

export default Home;