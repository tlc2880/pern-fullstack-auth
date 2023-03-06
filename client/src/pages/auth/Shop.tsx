import Layout from '../../components/Layout';
import {Row, Col, Container} from 'react-bootstrap';
import { productsArray } from '../eCom/productsStore';
import ProductCard from '../eCom/ProductCard';
import NavbarComponent from '../eCom/EComNav';
import CartProvider from '../eCom/CartContext';
function Shop() {
    return (
        <>
         <Layout>
            <CartProvider>
                <Container>
                    <NavbarComponent></NavbarComponent>
                    <h1 className="p-3">Welcome to the Store!</h1>
                    <Row xs={1} md={3} className="g-4">
                        {productsArray.map((product, idx) => (
                            <Col align="center" key={idx}>
                                <ProductCard product={product}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </CartProvider>
         </Layout>
        </>
    )
}

export default Shop;