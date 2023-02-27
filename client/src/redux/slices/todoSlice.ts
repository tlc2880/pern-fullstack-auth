import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoType from '../../todo.Type'

const baseURL = "http://localhost:5000";

const initialState = {
  todos: [],
  responseStatus: "",
  responseMessage: "",
};

export const getTodo = async (id: number) =>
  await axios.get(`/todos/${id}`);

export const getTodos: any = createAsyncThunk("todos/getTodos", async () => {
  try {
    const response = await axios.get(`${baseURL}/todos`);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getTodos.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: action.payload,
        responseStatus: "success",
      };
    },
    [getTodos.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
  },
});

export default todoSlice.reducer;