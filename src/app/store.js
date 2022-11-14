import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer } from "../features/movies/moviesSlice";
import { genresReducer } from '../features/movies/genresSlice';
import { detailReducer } from '../features/movies/detailSlice';
import { searchReducer } from '../features/movies/searchSlice';
import { authReducer } from '../features/movies/authSlice';
import { creditReducer } from '../features/movies/creditSlice';

export const store = configureStore({
  reducer: {
    movies : moviesReducer,
    genres : genresReducer,
    detail : detailReducer,
    search : searchReducer,
    auth   : authReducer,
    credit : creditReducer,
  },
})