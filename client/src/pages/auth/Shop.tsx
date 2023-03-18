import Layout from '../../components/Layout';
import {Row, Col, Container} from 'react-bootstrap';
import useProducts from "../shop/useProducts";
import ProductCard from '../shop/ProductCard';
import NavbarComponent from '../shop/EComNav';
import CartProvider from '../shop/CartContext';

function Shop() {
    const { productsArray } = useProducts();

    return (
        <>
         <Layout>
            <CartProvider>
                <Container>
                    <NavbarComponent></NavbarComponent>
                    <h1 className="p-3">Welcome to the Store!</h1>
                    <Row xs={1} md={3} className="g-4">
                        {productsArray && productsArray.map((item: any) => (
                            <Col align="center" key={item.id_shop}>
                                <ProductCard product={item} />
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