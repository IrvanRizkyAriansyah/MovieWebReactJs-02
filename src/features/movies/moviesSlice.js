import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getMovies = createAsyncThunk(
    "movies/getMovies", async () => {
        try {
           const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
            params: {
              api_key: process.env.REACT_APP_TMBD_KEY,
            }
          }) 
           console.log(res);
           return res.data.results
        } catch (error) {
            console.log(error)
        }
    }
)

export const getCarousel = createAsyncThunk(
    "movies/getCarousel", async () => {
        try {
           const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
            params: {
              api_key: process.env.REACT_APP_TMBD_KEY,
            }
          }) 
           console.log(res);
           return res.data.results.splice(0,3)
        } catch (error) {
            console.log(error)
        }
    }
)

export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        carousel: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getMovies.pending] : (state) => {
            state.loading = true
        },
        [getMovies.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.movies = payload
        },
        [getMovies.rejected] : (state) => {
            state.loading = false
        },
        [getCarousel.pending] : (state) => {
            state.loading = true
        },
        [getCarousel.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.carousel = payload
        },
        [getCarousel.rejected] : (state) => {
            state.loading = false
        },
    }
})

export const moviesReducer = moviesSlice.reducer
