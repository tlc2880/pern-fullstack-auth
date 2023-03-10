import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://localhost:5000";

const initialState = {
  items: [],
  responseStatus: "",
  responseMessage: "",
};

export const getItems: any = createAsyncThunk("shop/getItems", async () => {
  try {
    const response = await axios.get(`${baseURL}/shop`);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
});

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {},
    extraReducers: {
      [getItems.pending]: (state, action) => {
        return {
          ...state,
          responseStatus: "pending",
        };
      },
      [getItems.fulfilled]: (state, action) => {
        return {
          ...state,
          items: action.payload,
          responseStatus: "success",
        };
      },
      [getItems.rejected]: (state, action) => {
        return {
          ...state,
          responseStatus: "rejected",
          responseMessage: action.payload,
        };
    }
  },
});

export default shopSlice.reducer;