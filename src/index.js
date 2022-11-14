import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.min.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Detail from './screen/Detail';
import Search from './screen/Search';
import Movie from './screen/Movie';
import Genre from './screen/Genre';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './app/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="709708727147-mqp4g2eh3p1odu1g4r9pou9j21ppjr6q.apps.googleusercontent.com">
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/movie/" element={<Movie />} />
    <Route path="/movie/:id" element={<Detail />} />
    <Route path="/:id" element={<Detail />} />
    <Route path="/search/:query" element={<Search />} />
    <Route path="/genre/:genre" element={<Genre />} />
    </Routes>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
