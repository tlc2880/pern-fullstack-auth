import { useAppDispatch } from "../../redux/hooks";
import { deleteItem } from "../../redux/slices/shopSlice";
import { CartContext } from './CartContext';
import { useContext } from 'react';
import { ItemUpdate } from './ItemUpdate';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useProducts from "./useProducts";
import itemType from '../../item.Type'

type ItemCardProps = {
    product: itemType;
  }

const ItemCard = ( props: ItemCardProps ) => {
    const dispatch = useAppDispatch();

    const { productsArray } = useProducts();
    const product = props.product;
    const cart = useContext(CartContext);
    console.log(cart.items);
    console.log(productsArray)

    const handleDelete = (id: number) => {
        dispatch(deleteItem(id));
    };

    return (
    <>
        <Card sx={{ minWidth: 300 }}>
        <CardContent>
            <Typography align="left" sx={{ fontSize: 18 }} gutterBottom>
                Title: {product.title}
            </Typography>
            <Typography align="left" sx={{ fontSize: 18 }} gutterBottom>
                Price: ${product.price}
            </Typography>
            <Typography align="left" sx={{ fontSize: 18 }} gutterBottom>
                ID: {product.id}
            </Typography>
            <Typography align="left" sx={{ fontSize: 18 }} gutterBottom>
                Id_shop: {product.id_shop}
            </Typography>
        </CardContent>
        <CardActions>
            < ItemUpdate item={product}/>
            <IconButton
                component="button"
                onClick={() => handleDelete(product.id_shop)}
                color="error"
            >
                <DeleteIcon />
            </IconButton>
        </CardActions>
        </Card>
    </>
    )
}

export default ItemCard;