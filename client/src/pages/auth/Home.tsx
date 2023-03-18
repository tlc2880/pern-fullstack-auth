import Layout from '../../components/Layout';
import { ItemUpdate } from '../shop/ItemUpdate';
const itemInit = {
  id: "price_5555555",
  title: "Blue Pens",
  price: 1.39,
  id_shop: 21
}

function Home() {
  return (
    <Layout>
      <>
        <h1>Home page</h1>
        < ItemUpdate item={itemInit} />
      </>
    </Layout>
  );
}

export default Home;