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
      if (action.payload.commentParent === null) {
        state.unshift(action.payload);
      } else {
        const index = state.findIndex(
          (comment) => comment.commentCode === action.payload.commentParent
        );
        state[index].replies?.push(action.payload);
      }
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      if (action.payload.commentParent === null) {
        return state.filter(
          (item) => item.commentCode !== action.payload.commentCode
        );
      } else {
        const index = state.findIndex(
          (comment) => comment.commentCode === action.payload.commentParent
        );
        const replyIndex = state[index].replies.findIndex(
          (item) => item.commentCode === action.payload.commentCode
        );
        state[index].replies.splice(replyIndex, 1);
      }
    });
  },
});
export default commentSlice;
export { viewComments, addComment, updateComment, deleteComment };
