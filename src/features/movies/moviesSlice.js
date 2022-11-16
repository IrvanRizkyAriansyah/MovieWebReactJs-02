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
           return res.data.results.splice(0,3)
        } catch (error) {
            console.log(error)
        }
    }
)

export const getUpcoming = createAsyncThunk(
    "movies/getUpcoming", async () => {
        try {
           const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/upcoming`, {
            params: {
              api_key: process.env.REACT_APP_TMBD_KEY,
            }
          }) 
           return res.data.results
        } catch (error) {
            console.log(error)
        }
    }
)

export const getTopRated = createAsyncThunk(
    "movies/getTopRated", async () => {
        try {
           const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/top_rated`, {
            params: {
              api_key: process.env.REACT_APP_TMBD_KEY,
            }
          }) 
           return res.data.results
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
        upcoming: [],
        top_rated: [],
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
        [getUpcoming.pending] : (state) => {
            state.loading = true
        },
        [getUpcoming.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.upcoming = payload
        },
        [getUpcoming.rejected] : (state) => {
            state.loading = false
        },
        [getTopRated.pending] : (state) => {
            state.loading = true
        },
        [getTopRated.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.top_rated = payload
        },
        [getTopRated.rejected] : (state) => {
            state.loading = false
        },
    }
})

export const moviesReducer = moviesSlice.reducer
