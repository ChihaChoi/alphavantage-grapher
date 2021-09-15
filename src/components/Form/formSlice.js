import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchApi from "../../service/fetchApi";

export const initialState = {
  data: undefined,
  error: "",
  symbol: "",
  interval: "",
  loading: false,
};

export const fetchApiDataAsync = createAsyncThunk(
  "form/fetchData",
  async (params) => {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${params.symbol}&interval=${params.interval}&apikey=adasdsdfgdf`;

    const response = await fetchApi(url);

    // formSlice.actions.reduceData(response);
    return response;
  }
);

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    reduceData: (state, action) => {
      state.data = action.payload;
    },
    reduceSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    reduceInterval: (state, action) => {
      state.interval = action.payload;
    },
    reduceError: (state, action) => {
      state.error = action.payload;
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchData.fulfilled, (state, action) => {
        // Add user to the state array
        state.data = action.payload;
      });
    },
  },
});

export const { reduceData, reduceSymbol, reduceInterval, reduceError } =
  formSlice.actions;

export const selectData = (state) => state.form.data;
export const selectInterval = (state) => state.form.interval;
export const selectSymbol = (state) => state.form.symbol;
export const selectError = (state) => state.form.error;

export default formSlice.reducer;
