import Layout from '../../components/Layout';
import { ProductUpdate } from '../eCom/ProductUpdate';
const itemInit = {
  id: "price_5555555",
  title: "Blue Pens",
  price: 1.39,
  id_shop: 21
}

function Home() {
  return (
      <>
        < ProductUpdate item={itemInit} />
      </>
     );
}

export default Home;