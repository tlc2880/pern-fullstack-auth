import { useEffect  } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getItems } from "../../redux/slices/shopSlice";

const useProducts = () => {
  const shop = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();
  const productsArray = [...shop.items];

  useEffect(() => {
      dispatch(getItems());
    }, [dispatch]);

function getProductData(id) {
  let productData = productsArray.find(product => product.id === id);

  if (productData === undefined) {
    console.log("Product data does not exist for ID: " + id);
  }
  return productData;
}

  return { productsArray, getProductData };
};

export default useProducts;