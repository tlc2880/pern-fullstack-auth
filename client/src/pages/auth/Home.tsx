import Layout from '../../components/Layout';
import {Row, Col, Container} from 'react-bootstrap';
import useProducts from "../shop/useProducts";
import ItemCard from '../shop/ItemCard';
import CartProvider from '../shop/CartContext';
import itemType from '../../item.Type'

function Home() {
  const { productsArray } = useProducts();

  return (
    <>
      <Layout>
        <CartProvider>
          <Container>
            <h1 className="p-3">Administration of Store Items</h1>
            <Row xs={1} md={3} className="g-4">
              {productsArray && productsArray.map((item: itemType) => (
                <Col align="center" key={item.id_shop}>
                  <ItemCard product={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </CartProvider>
      </Layout>
    </>
  )
}

export default Home;