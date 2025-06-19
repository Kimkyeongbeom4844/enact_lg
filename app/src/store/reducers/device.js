import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: 0,
  height: 0,
  orientation: "portrait",
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setWindowSize: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    setOrientation: (state, action) => {
      state.orientation = action.payload;
    },
  },
});

export const { setWindowSize, setOrientation } = deviceSlice.actions;
export default deviceSlice.reducer;
