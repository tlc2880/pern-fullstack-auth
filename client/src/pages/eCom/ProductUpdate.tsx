import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
  } from '@mui/material'
  import { useState } from 'react'
  import itemType from '../../item.Type'

  type EditItemProps = {
    item: itemType;
  }

  export const ProductUpdate = ( {item}: EditItemProps ) => {
    const [newItem, setNewItem] = useState<itemType>();
    const [open, setOpen] = useState(false)

    const handleEdit = (item: itemType) => {
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
  