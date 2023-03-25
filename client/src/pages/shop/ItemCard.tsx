import { useAppDispatch } from "../../redux/hooks";
import { deleteItem } from "../../redux/slices/shopSlice";
import { ItemUpdate } from './ItemUpdate';
import {
    IconButton,
    Typography,
    CardContent,
    Card,
    Stack
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import itemType from '../../item.Type'

type ItemCardProps = {
    product: itemType;
  }

const ItemCard = ( props: ItemCardProps ) => {
    const dispatch = useAppDispatch();
    const product = props.product;

    const handleDelete = (id: number) => {
        dispatch(deleteItem(id));
    };

    return (
    <>
        <Card sx={{ minWidth: 355 }}>
        <CardContent>
            <Typography align="left" sx={{ fontSize: 16 }} >
                Name: {product.title}
            </Typography>
            <Typography align="left" sx={{ fontSize: 16 }} >
                Price: ${product.price}
            </Typography>
            <Typography align="left" sx={{ fontSize: 16 }} >
                ID: {product.id}
            </Typography>
            <Typography align="left" sx={{ fontSize: 16 }} >
                Id_shop: {product.id_shop}
            </Typography>
            
            <Stack direction="row" justifyContent="center" spacing={2}>
                < ItemUpdate item={product}/>
                <IconButton
                    component="button"
                    onClick={() => handleDelete(product.id_shop)}
                    color="error"
                >
                    <DeleteIcon />
                </IconButton>
            </Stack>
        </CardContent>
        </Card>
    </>
    )
}

export default ItemCard;