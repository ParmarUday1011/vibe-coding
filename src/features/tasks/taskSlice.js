import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/complaints"; // Replace with real API

// GET
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// POST
export const addTask = createAsyncThunk("tasks/add", async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

// DELETE
export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// PUT
export const updateTask = createAsyncThunk("tasks/update", async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    search: "",
    loading: false,
    editing: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setEditingTask: (state, action) => {
      state.editing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        state.list[index] = action.payload;
      });
  },
});

export const { setSearch, setEditingTask } = taskSlice.actions;
export default taskSlice.reducer;