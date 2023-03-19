import { updateItem } from "../../redux/slices/shopSlice";
import { useAppDispatch,  } from "../../redux/hooks";
import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    FormControl,
    IconButton
  } from '@mui/material'
import { useState } from 'react'
import itemType from '../../item.Type'

type ItemUpdateProps = {
  item: itemType;
}

export const ItemUpdate = ( {item}: ItemUpdateProps ) => {
  const [newItem, setNewItem] = useState<itemType>({
      id: item.id,
      title: item.title,
      price: item.price,
      id_shop: item.id_shop
    });
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(item.id);
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price);

  const dispatch = useAppDispatch();

  const handleEdit = (item: itemType) => {
    dispatch(updateItem(newItem));
    window.location.reload();
  };
  console.log (newItem);
  return (
    <>
    <IconButton
      component="button"
      onClick={() => setOpen(true)}
      color="warning"
    >
      <EditIcon />
    </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle id='dialog-title'>Edit Shop Item</DialogTitle>
        <DialogContent>
          <Box sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" }
          }}>
          <FormControl fullWidth>
            <TextField
              autoFocus
              margin="normal"
              label="Item title"
              variant="outlined"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value); 
                setNewItem({...newItem, 'title': event.target.value});
              }}
            />
            <TextField
              type="number"
              autoFocus
              margin="normal"
              label="Item price"
              variant="outlined"
              value={price}
              onChange={(event) => {
                setPrice(Number(event.target.value));
                setNewItem({...newItem, 'price': Number(event.target.value)});
              }}
            />
            <TextField
              sx={{ minWidth: 200}}
              autoFocus
              margin="normal"
              label="Item id"
              variant="outlined"
              value={id}
              onChange={(event) => {
                setId(event.target.value); 
                setNewItem({...newItem, 'id': event.target.value});
              }}
            />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setOpen(false)}
            style={{
              backgroundColor: "red",
              margin: "5px"
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            onClick={() => handleEdit(item)}
            style={{
              backgroundColor: "green",
              margin: "5px"
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}