import React, { useState } from "react";
import { updateTodo } from "../../redux/slices/todoSlice";
import { useAppDispatch,  } from "../../redux/hooks";
import { SelectChangeEvent } from '@mui/material/Select';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormGroup,
  Checkbox,
  Button,
  Box,
  Grid
} from '@mui/material';
import todoType from '../../todo.Type';

type EditTodoProps = {
  todo: todoType;
}
const EditTodo = ( {todo}: EditTodoProps ) => {
  const [newTodo, setNewTodo] = useState<todoType>({
    todo_id: todo.todo_id,
    owner: todo.owner,
    description: todo.description,
    completed: todo.completed,
    day: todo.day,
    priority: todo.priority,
    morning: todo.morning,
    afternoon: todo.afternoon,
    evening: todo.evening,
  });
  const [description, setDescription] = useState(todo.description);
  const [owner, setOwner] = useState(todo.owner);
  const [priority, setPriority] = useState(todo.priority);
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(todo.day);
  const [time, setTime] = useState({
    morning: todo.morning,
    afternoon: todo.afternoon,
    evening: todo.evening
  });

  const dispatch = useAppDispatch();

  const handleEdit = (todo: todoType) => {
    dispatch(updateTodo(newTodo));
    window.location.reload();
  };

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
    // eslint-disable-next-line 
    setNewTodo({...newTodo, ['day']: event.target.value});
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime({ ...time, [event.target.name]: event.target.checked });
    setNewTodo({ ...newTodo, [event.target.name]: event.target.checked });
  };
  const { morning, afternoon, evening } = time;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        component="button"
        onClick={handleClickOpen}
        disabled={todo.completed}
        color="warning"
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        <CloseIcon />
        </IconButton>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent sx={{ width: 800, maxWidth: "100%" }}>
          <TextField
            autoFocus
            margin="normal"
            label="Todo description"
            variant="outlined"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              // eslint-disable-next-line 
              setNewTodo({...newTodo, ['description']: event.target.value});
            }}
          />
          <TextField
            autoFocus
            margin="normal"
            label="Todo owner"
            variant="outlined"
            value={owner}
            onChange={(event) => {
              setOwner(event.target.value);
              // eslint-disable-next-line 
              setNewTodo({...newTodo, ['owner']: event.target.value});
            }}
          />
      
            <FormControl>
              <FormLabel>Priority</FormLabel>
                <RadioGroup
                  value={priority}
                  onChange={(event) => {
                    setPriority(event.target.value);
                    // eslint-disable-next-line 
                    setNewTodo({...newTodo, ['priority']: event.target.value});
                  }}
                  row
                >
                <FormControlLabel
                  key="high"
                  value="high"
                  control={<Radio size="small" />}
                  label="High"
                />
                <FormControlLabel
                  key="medium"
                  value="medium"
                  control={<Radio size="small" />}
                  label="Medium"
                />
                <FormControlLabel
                  key="low"
                  value="low"
                  control={<Radio size="small" />}
                  label="Low"
                />
              </RadioGroup>
            </FormControl>

            <Grid item>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={day}
                  label="Day"
                  onChange={handleDayChange}
                >
                  <MenuItem key={"Monday"} value={"Monday"}>Monday</MenuItem>
                  <MenuItem key={"Tuesday"} value={"Tuesday"}>Tuesday</MenuItem>
                  <MenuItem key={"Wednesday"} value={"Wednesday"}>Wednesday</MenuItem>
                  <MenuItem key={"Thursday"} value={"Thursday"}>Thursday</MenuItem>
                  <MenuItem key={"Friday"} value={"Friday"}>Friday</MenuItem>
                  <MenuItem key={"Saturday"} value={"Saturday"}>Saturday</MenuItem>
                  <MenuItem key={"Sunday"} value={"Sunday"}>Sunday</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item>
          <FormLabel>Time</FormLabel>
          <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox 
                    name="morning"
                    onChange={handleCheckboxChange}
                    checked = {morning}
                  />} 
                label="Morning" 
              />
              <FormControlLabel 
                control={
                  <Checkbox 
                    name="afternoon" 
                    onChange={handleCheckboxChange}
                    checked={afternoon}
                  />} 
                label="Afternoon" 
              />
              <FormControlLabel 
                control={
                  <Checkbox 
                    name="evening"  
                    onChange={handleCheckboxChange}
                    checked={evening}
                  />}
                label="Evening" 
              />
          </FormGroup>
        </Grid>

        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            onClick={() => handleEdit(todo)}
            style={{
              backgroundColor: "green",
              margin: "3px"
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTodo;