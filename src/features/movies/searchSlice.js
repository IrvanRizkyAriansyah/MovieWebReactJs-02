import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getSearch = createAsyncThunk(
    "movies/getSearch", async (query) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/search/movie`, {
            params: {
            api_key: process.env.REACT_APP_TMBD_KEY,
            query: `${query}`
            }
            })
            return res.data.results
        } catch (error) {
            console.error(error)
        }
    }
)

export const getSearchGenre = createAsyncThunk(
    "movies/getSearchGenre", async (genre) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/search/movie`, {
            params: {
            api_key: process.env.REACT_APP_TMBD_KEY,
            query: `${genre}`
            }
            })
            return res.data.results
        } catch (error) {
            console.error(error)
        }
    }
)

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        search: [],
        searchGenre: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getSearch.pending] : (state) => {
            state.loading = true
        },
        [getSearch.fulfilled] : (state, action) => {
            state.loading = false
            state.search = action.payload
        },
        [getSearch.rejected] : (state) => {
            state.loading = false
        },
        [getSearchGenre.pending] : (state) => {
            state.loading = true
        },
        [getSearchGenre.fulfilled] : (state, action) => {
            state.loading = false
            state.searchGenre = action.payload
        },
        [getSearchGenre.rejected] : (state) => {
            state.loading = false
        }
    }
})

export const searchReducer = searchSlice.reducer