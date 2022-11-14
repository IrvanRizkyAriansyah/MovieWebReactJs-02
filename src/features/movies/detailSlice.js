import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getDetail = createAsyncThunk(
    "movies/getDetail", async (id) => {
        try {
            const res =await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${id}`, {
            params: {
              api_key: process.env.REACT_APP_TMBD_KEY
            }
            })
            console.log(res.data)
            return res.data
          } catch (error) {
            console.error(error)
          }
    }
)

export const detailSlice = createSlice({
    name: "detail",
    initialState: {
        detail: [],
        genre: [],
        rating: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getDetail.pending] : (state) => {
            state.loading = true
        },
        [getDetail.fulfilled] : (state, action) => {
            state.loading = false
            state.detail = action.payload
            state.genre = action.payload.genres
            state.rating = action.payload.vote_average.toFixed(1)
        },
        [getDetail.rejected] : (state) => {
            state.loading = false
        }
    }
})

export const detailReducer = detailSlice.reducer