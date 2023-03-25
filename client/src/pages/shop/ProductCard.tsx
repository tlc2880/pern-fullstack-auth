import {
    Button,
    Card,
    FormControl,
    CardHeader,
    CardContent,
    Typography,
    Stack,
    IconButton
  } from '@mui/material'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
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
  return (    
    <Card elevation={1}>
      <CardHeader
        title={product.title}
        align="center"
      />
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary">
          Price for each: ${product.price}
        </Typography>
      {Number(productQuantity) > 0 ?
        <>
        <FormControl fullWidth>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* @ts-expect-error */}
            <Typography  sx={{ fontSize: 16 }} color="text.primary" >
              Total quantity: {productQuantity}
            </Typography>
            <IconButton 
              color="primary" 
              aria-label="add to shopping cart"
              onClick={() => cart.addOneToCart(product.id)}
            >
              <AddShoppingCartIcon />
            </IconButton>
            <IconButton 
              color="primary" 
              aria-label="remove from to shopping cart"
              onClick={() => cart.removeOneFromCart(product.id)}
            >
              <RemoveShoppingCartIcon />
            </IconButton>
            <IconButton
              component="button"
              onClick={() => cart.deleteFromCart(product.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </FormControl>
      </>
      :
      <Stack direction="row" justifyContent="center">
        <Button 
          size="small"
          variant="contained" 
          color="primary" 
          onClick={() => cart.addOneToCart(product.id)}
          style = {{
            backgroundColor: "green",
            margin: "5px"
          }}
        >
          Add To Cart
        </Button>
      </Stack>
      }
      </CardContent>
    </Card>
  )
}

export default ProductCard;