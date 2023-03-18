import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { useContext } from 'react';
import itemType from '../../item.Type'

type ProductCardProps = {
    product: itemType;
  }

const ProductCard = ( props: ProductCardProps ) => {
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.id);
    console.log(cart.items);
    return (
        <Card>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                { Number(productQuantity) > 0 ?
                    <>
                        <Form>
                            <Form.Group as={Row}>
                            {/* @ts-expect-error */}
                            <Form.Label column sm="5">
                                In Cart: {productQuantity}
                            </Form.Label>
                            <Col sm="6">
                                <Button size="sm" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                                <Button size="sm" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
                            </Col>
                            </Form.Group>
                        </Form>
                        <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from cart</Button>
                    </>
                    :
                    <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
                }
             </Card.Body>
        </Card>
    )
}

export default ProductCard;