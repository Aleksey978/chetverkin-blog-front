import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fechPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fechTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fechRemovePost = createAsyncThunk(
  "posts/fechRemovePost",
  async (id) => {
    axios.delete(`/posts/${id}`);
  },
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    //Получение статей
    [fechPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fechPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fechPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //Получение тегов
    [fechTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fechTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fechTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    //Удаление статьи
    [fechRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg,
      );
    },
    [fechRemovePost.rejected]: (state) => {
      state.posts.status = "error";
    },
  },
});

export const postsReduser = postsSlice.reducer;
