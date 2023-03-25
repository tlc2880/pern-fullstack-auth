import { useState, useContext } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    Stack,
    useMediaQuery,
  } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { CartContext } from "./CartContext";
import CartProduct from './CartProduct';
import quantityType from '../../quantity.Type'

const CheckoutDialog = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false)
  const cart = useContext(CartContext);

  const checkout = async () => {
      await fetch('http://localhost:5000/shop/checkout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: cart.items})
      }).then((response) => {
        return response.json();
      }).then((response) => {
        if(response.url) {
          window.location.assign(response.url); // Forwarding user to Stripe
        }
      });
  }

  const productsCount = cart.items.reduce((sum, product: quantityType) => sum + product.quantity, 0);

  return (
    <>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpen(true)}
        style = {{
          backgroundColor: "blue",
          margin: "5px"
        }}
      >
        Cart ({productsCount} Items)
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle 
          id='dialog-title' 
          align="center" 
          color="primary"
          >Shopping Cart
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%', minWidth: 250 }}>
            {productsCount > 0 ?
              <>
                <h5>Items in your cart:</h5>
                {cart.items.map((currentProduct: quantityType, idx) => (
                  <CartProduct 
                    key={idx} 
                    id={currentProduct.id} 
                    quantity={currentProduct.quantity}
                  />
                  ))
                }
                {/* @ts-expect-error */}
                <Typography align="left" color="primary" sx={{ fontSize: 18 }} >
                  Total: ${cart.getTotalCost()}
                </Typography>
                <hr></hr>
                <Stack direction="row" justifyContent="center">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => setOpen(false)}
                  style={{
                    backgroundColor: "red",
                    margin: "5px"
                  }}>
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style = {{
                    backgroundColor: "green",
                    margin: "5px"
                  }}
                  onClick={checkout}
                >
                  Purchase Item!
                </Button>
                </Stack>
              </>
            :
              <p>There are no items in your cart!</p>
            }
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default CheckoutDialog