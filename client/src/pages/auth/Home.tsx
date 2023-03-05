import Layout from '../../components/Layout';
//import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '../eCom/EComNav';
import { Container } from 'react-bootstrap';
import Shop from '../eCom/Shop';
import CartProvider from '../eCom/CartContext';
function Home() {
  return (
    <Layout>
      <CartProvider>
        <Container>
          <NavbarComponent></NavbarComponent>
          < Shop />
        </Container>
      </CartProvider>
    </Layout>
  );
}

export default Home;