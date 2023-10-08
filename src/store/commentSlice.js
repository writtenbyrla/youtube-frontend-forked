import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComments } from "../api/video";
import { postComment, putComment, delComment } from "../api/comment";

const viewComments = createAsyncThunk(
  "commentSlice/viewComments",
  async (id) => {
    const result = await getComments(id);
    return result.data;
  }
);

const addComment = createAsyncThunk("commentSlice/addComment", async (data) => {
  const result = await postComment(data);
  return result.data;
});

const updateComment = createAsyncThunk(
  "commentSlice/updateComment",
  async (data) => {
    const result = await putComment(data);
    return result.data;
  }
);

const deleteComment = createAsyncThunk(
  "commentSlice/deleteComment",
  async (id) => {
    const result = await delComment(id);
    return result.data;
  }
);

const commentSlice = createSlice({
  name: "commentSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(viewComments.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.unshift(action.payload);
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});
export default commentSlice;
export { viewComments, addComment, updateComment, deleteComment };
