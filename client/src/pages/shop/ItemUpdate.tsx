import { updateItem } from "../../redux/slices/shopSlice";
import { useAppDispatch,  } from "../../redux/hooks";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    FormControl
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
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          >
          <DialogTitle id='dialog-title'>Edit Shop Item</DialogTitle>
          <DialogContent>
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
            <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
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
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => handleEdit(item)} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
  