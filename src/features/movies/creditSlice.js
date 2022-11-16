import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getCredit = createAsyncThunk(
    "movies/getCredit", async (id) => {
        try {
            const res =await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${id}/credits`, {
            params: {
              api_key: process.env.REACT_APP_TMBD_KEY
            }
            })
            return res.data
          } catch (error) {
            console.error(error)
          }
    }
)

export const creditSlice = createSlice({
    name: "credit",
    initialState: {
        cast: [],
        crew: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getCredit.pending] : (state) => {
            state.loading = true
        },
        [getCredit.fulfilled] : (state, action) => {
            state.loading = false
            state.cast = action.payload.cast
            state.crew = action.payload.crew
        },
        [getCredit.rejected] : (state) => {
            state.loading = false
        }
    }
})

export const creditReducer = creditSlice.reducer