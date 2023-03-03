import Layout from '../../components/Layout';
import { Container } from 'react-bootstrap';
import Shop from '../eCom/Shop';
import CartProvider from '../eCom/CartContext';
function Home() {
  return (
    <Layout>
      <CartProvider>
        <Container>
          < Shop />
        </Container>
      </CartProvider>
    </Layout>
  );
}

export default Home;