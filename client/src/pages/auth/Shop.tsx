import {memo} from 'react'
import Layout from '../../components/Layout';
import {
    Container,
    Grid
  } from '@mui/material'
import useProducts from "../shop/useProducts";
import ProductCard from '../shop/ProductCard';
import CheckoutDialog from '../shop/CheckoutDialog';
import CartProvider from '../shop/CartContext';
import itemType from '../../item.Type'

function Shop() {
  const { productsArray } = useProducts();

  return (
    <>
      <Layout>
        <CartProvider>
          <Container>
            <CheckoutDialog></CheckoutDialog>
            <h3 style={{textAlign: "center"}}>Welcome to the Store!</h3>
            <Grid container spacing={2}>
                { productsArray.map((item: itemType) => (
                  <Grid item key={item.id} xs={12} md={6} lg={4}>
                    <ProductCard product={item} />
                  </Grid>
                ))}
            </Grid>
          </Container>
        </CartProvider>
      </Layout>
    </>
  )
}
const MemoizedShop = memo(Shop);
export default MemoizedShop;