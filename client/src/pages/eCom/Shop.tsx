import {Row, Col} from 'react-bootstrap';
import { productsArray } from './productsStore';
import ProductCard from './ProductCard';
function Shop() {

    return (
        <>
            <h1 className="p-3">Welcome to the Store!</h1>
            <Row xs={1} md={3} className="g-4">
                {productsArray.map((product, idx) => (
                    <Col align="center" key={idx}>
                        <ProductCard product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Shop;