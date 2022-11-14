import './App.css';
import React from 'react';
import Poster from './screen/Carousel'
import Navbar from './screen/Nav'
import Trending from './screen/Trending'
import Genre from './component/GenreHome'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <div className='bg-gray-900'>
    <GoogleOAuthProvider clientId="709708727147-mqp4g2eh3p1odu1g4r9pou9j21ppjr6q.apps.googleusercontent.com">
      <Navbar />
      <Poster />
      <Trending />
      <Genre />
    </GoogleOAuthProvider>
    </div>
  );
}
