import { useContext } from "react";
import { Button, Stack } from '@mui/material'
import { CartContext } from "./CartContext";
import useProducts from "./useProducts";
import quantityType from '../../quantity.Type'

function CartProduct(props: quantityType) {
    const { getProductData } = useProducts();
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const productData: any  = getProductData(id);

    return (
        <>
            <h6>Name: {productData.title}</h6>
            <h6>Total quantity: {quantity}</h6>
            <h6>Total cost: ${ (quantity * productData.price).toFixed(2) }</h6>
            <Stack direction="row" justifyContent="center">
                <Button 
                    size="small" 
                    color="success" 
                    variant="contained" 
                    onClick={() => cart.deleteFromCart(id)}
                    style={{
                        backgroundColor: "blue",
                        margin: "5px"
                    }}
                >Remove
                </Button>

            </Stack>
            <hr></hr>
        </>
    )
}

export default CartProduct;