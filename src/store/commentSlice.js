import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComments } from "../api/video";

const viewComments = createAsyncThunk("commentSlice/asyncView", async (id) => {
  const result = await getComments(id);
  return result.data;
});

const commentSlice = createSlice({
  name: "commentSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(viewComments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export default commentSlice;
export { viewComments };
