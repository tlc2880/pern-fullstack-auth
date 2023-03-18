import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemType from "../../item.Type";

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

export const updateItem: any = createAsyncThunk(
  "shop/updateItem",
  async (item: itemType, { rejectWithValue }) => {
    try {
      const response = await axios.put( `${baseURL}/shop/${item.id_shop}`, item );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

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
      },
      [updateItem.pending]: (state, action) => {
        return {
          ...state,
          responseStatus: "pending",
        };
      },
      [updateItem.fulfilled]: (state, action) => {
        return {
          ...state,
          items: state.items.map((item: itemType) =>
            item.id_shop === action.payload.id_shop ? action.payload : item
          ),
          responseStatus: "success",
          responseMessage: "Item updated successfully",
        };
      },
      [updateItem.rejected]: (state, action) => {
        return {
          ...state,
          responseStatus: "rejected",
          responseMessage: action.payload,
        };
      }
  },
});

export default shopSlice.reducer;