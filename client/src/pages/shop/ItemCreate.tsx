import { createItem } from "../../redux/slices/shopSlice";
import { useAppDispatch,  } from "../../redux/hooks";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    FormControl,
    InputAdornment
  } from '@mui/material'
  import { useState } from 'react'
  import itemType from '../../item.Type'

const ItemCreate = () => {
    const initialValues = {
        id: "",
        title: "",
        price: null,
        id_shop: 0
    }

    const [ formValues, setFormValues ] = useState<itemType>(initialValues);
    const [open, setOpen] = useState(false)

    const dispatch = useAppDispatch();

    const onSubmitForm = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      dispatch(createItem(formValues));
      window.location.reload();
    };
  
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    return (
      <>
        <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setOpen(true)}
            style = {{
                backgroundColor: "green",
                margin: "5px"
            }}
        >
            New Item
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
            <form onSubmit={onSubmitForm}>
                <DialogTitle id='dialog-title'>Create New Shop Item</DialogTitle>
                <DialogContent>
                <Box sx={{
                    "& .MuiTextField-root": { m: 1, width: "40ch" }
                }}>
                <FormControl fullWidth>
                <TextField
                    id="title"
                    name="title"
                    label="Enter title"
                    type="text"
                    variant="outlined" 
                    value={formValues.title}
                    onChange={handleInputChange}
                />
                <TextField
                    id="price"
                    name="price"
                    label="Enter price"
                    type="number"
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    value={formValues.price}
                    onChange={handleInputChange}
                />
                <TextField
                    id="id"
                    name="id"
                    label="Enter id"
                    type="text"
                    value={formValues.id}
                    onChange={handleInputChange}
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
                    }}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit" style={{
                    backgroundColor: "green",
                    margin: "5px"
                }}>
                    Submit
                </Button>
            </DialogActions>
            </form>
        </Dialog>
      </>
    )
  }
  export default ItemCreate