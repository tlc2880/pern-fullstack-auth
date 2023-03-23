import { useState, SyntheticEvent, ChangeEvent } from "react";
import { createTodo } from "../../redux/slices/todoSlice";
import { useAppDispatch,  } from "../../redux/hooks";
import {
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormGroup,
  Checkbox,
  Button,
  Box,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import todoType from '../../todo.Type'

const InputTodo = () => {
  const initialValues = {
    todo_id: "",
    description: "",
    owner: "",
    priority: "low",
    day: "Monday",
    morning: true,
    afternoon: false,
    evening: false,
    completed: false
  };

  const [ formValues, setFormValues ] = useState<todoType>(initialValues);
  const [ open, setOpen ] = useState(false)
  const [ day, setDay ] = useState("Monday");
  const [ time, setTime ] = useState({
    morning: true,
    afternoon: false,
    evening: false
  })

  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
    setFormValues({
      ...formValues,
      // eslint-disable-next-line 
      ['day']: event.target.value,
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime({ ...time, [event.target.name]: event.target.checked as boolean });
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
  };

  const dispatch = useAppDispatch();

  const onSubmitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(createTodo(formValues));
    window.location.reload();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const { morning, afternoon, evening } = time;
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
        New Todo
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
      <form onSubmit={onSubmitForm}>
        <DialogTitle id='dialog-title'>Create New Todo</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" }
            }}
          >
          <FormGroup>
            <TextField
            id="description"
            name="description"
            label="Enter description"
            type="text"
            value={formValues.description}
            onChange={handleInputChange}
          />
          <TextField
            id="owner"
            name="owner"
            label="Enter owner"
            type="text"
            value={formValues.owner}
            onChange={handleInputChange}
          /> 
          </FormGroup>
         
          <FormGroup>
          <FormLabel>Priority</FormLabel>
            <RadioGroup
              name="priority"
              value={formValues.priority}
              onChange={handleInputChange}
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
          </FormGroup>

          <FormGroup>
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={day}
                label="Day"
                onChange={handleChange}
              >
                <MenuItem key={"Monday"} value={"Monday"}>Monday</MenuItem>
                <MenuItem key={"Tuesday"} value={"Tuesday"}>Tuesday</MenuItem>
                <MenuItem key={"Wednesday"} value={"Wednesday"}>Wednesday</MenuItem>
                <MenuItem key={"Thursday"} value={"Thursday"}>Thursday</MenuItem>
                <MenuItem key={"Friday"} value={"Friday"}>Friday</MenuItem>
                <MenuItem key={"Saturday"} value={"Saturday"}>Saturday</MenuItem>
                <MenuItem key={"Sunday"} value={"Sunday"}>Sunday</MenuItem>
              </Select>
          </FormGroup>
            
          <FormGroup>
            <FormLabel>Time</FormLabel>
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
        </Box >
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setOpen(false)}
            style={{
              backgroundColor: "red",
              margin: "3px"
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" style={{
            backgroundColor: "green",
            margin: "3px"
          }}>
            Submit
          </Button>
        </DialogActions>
      </form>
      </Dialog>
    </>
  );
};
export default InputTodo;