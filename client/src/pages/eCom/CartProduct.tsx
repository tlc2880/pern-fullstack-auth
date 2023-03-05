import Button from 'react-bootstrap/Button';
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { getProductData } from "./productsStore";

type CartProductProps = {
    id: string;
    quantity: number;
}

function CartProduct(props: CartProductProps) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const productData: any  = getProductData(id);

    return (
        <>
            <h3>{productData.title}</h3>
            <p>{quantity} total</p>
            <p>${ (quantity * productData.price).toFixed(2) }</p>
            <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )
}

export default CartProduct;