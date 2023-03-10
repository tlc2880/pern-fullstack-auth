import { useEffect  } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getItems } from "../../redux/slices/shopSlice";
import Layout from '../../components/Layout';
import {Row, Col, Container} from 'react-bootstrap';
//import { productsArray } from '../eCom/productsStore';
import ProductCard from '../eCom/ProductCard';
import NavbarComponent from '../eCom/EComNav';
import CartProvider from '../eCom/CartContext';
import itemType from '../../item.Type'

function Shop() {
    const shop = useAppSelector((state) => state.shop);
    const dispatch = useAppDispatch();
    const items: itemType[] = [...shop.items];

    useEffect(() => {
        dispatch(getItems());
      }, [dispatch]);

    return (
        <>
         <Layout>
            <CartProvider>
                <Container>
                    <NavbarComponent></NavbarComponent>
                    <h1 className="p-3">Welcome to the Store!</h1>
                    <Row xs={1} md={3} className="g-4">
                        {items.map((item) => (
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