import Layout from '../../components/Layout';
import { Container, Grid } from '@mui/material'
import useProducts from "../shop/useProducts";
import ItemCard from '../shop/ItemCard';
import ItemCreate from '../shop/ItemCreate';
import CartProvider from '../shop/CartContext';
import itemType from '../../item.Type'

function ShopAdmin() {
  const { productsArray } = useProducts();

  return (
    <>
      <Layout>
        <CartProvider>
          <Container>
            < ItemCreate />
            <h3 style={{textAlign: "center"}}>Administration of Store Items</h3>
            <Grid container spacing={2}>
              { productsArray.map((item: itemType) => (
                <Grid item key={item.id} xs={12} md={6} lg={4}>
                  <ItemCard product={item} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </CartProvider>
      </Layout>
    </>
  )
}

export default ShopAdmin;