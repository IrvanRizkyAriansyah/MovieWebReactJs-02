import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getGenres = createAsyncThunk(
    "movies/getGenres", async () => {
        try {
           const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/genre/movie/list`, {
            params: {
              api_key: process.env.REACT_APP_TMBD_KEY,
            }
          }) 
           console.log(res);
           return res.data.genres
        } catch (error) {
            console.log(error)
        }
    }
)

export const genresSlice = createSlice({
    name: "genres",
    initialState: {
        genre: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getGenres.pending] : (state) => {
            state.loading = true
        },
        [getGenres.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.genre = payload
        },
        [getGenres.rejected] : (state) => {
            state.loading = false
        }
    }
})

export const genresReducer = genresSlice.reducer