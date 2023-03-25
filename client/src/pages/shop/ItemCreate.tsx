import { useState, SyntheticEvent, ChangeEvent } from 'react'
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
    InputAdornment,
    useMediaQuery,
  } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import itemType from '../../item.Type'

const ItemCreate = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const initialValues = {
        id: "",
        title: "",
        price: 0,
        id_shop: 0
    }
    const dispatch = useAppDispatch();
    const [ formValues, setFormValues ] = useState<itemType>(initialValues);
    const [open, setOpen] = useState(false)

    const onSubmitForm = async (event: SyntheticEvent) => {
      event.preventDefault();
      dispatch(createItem(formValues));
      window.location.reload();
    };
  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
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
            fullScreen={fullScreen}
            open={open}
            onClose={() => setOpen(false)}
        >
            <form onSubmit={onSubmitForm}>
                <DialogTitle id='dialog-title'>Create New Shop Item</DialogTitle>
                <DialogContent>
                <Box sx={{ width: '100%', minWidth: 320 }}>
                <FormControl fullWidth>
                <TextField
                    autoFocus
                    margin="normal"
                    label="Enter title"
                    type="text"
                    variant="outlined" 
                    value={formValues.title}
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="normal"
                    label="Enter price"
                    type="number"
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    value={formValues.price}
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="normal"
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
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    style={{
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