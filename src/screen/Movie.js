import '../App';
import { useEffect } from "react";
import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Navbar from './Nav'
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../features/movies/moviesSlice'

export default function Movie() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {movies, loading} = useSelector ((state) => state.movies)

  useEffect(() => {
    dispatch(getMovies())
  }, [dispatch])

  if (loading) return <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Loading...</p>

  return (
    <div className='bg-gray-900'>
    <Navbar />
    <Header query="All Movies" />
    <div className='px-6'>
    <h2 className='text-lg font-bold text-white border-l-2 border-l-red-500 pl-2 my-4'>All Movies</h2>
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-5'>
      {
        movies.map((res, index) => {
          return(
            // <Card
            //   hoverable key={res.id}
            //   style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
            //   bodyStyle={{padding: 0}}
            //   cover={<img alt="example" src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} style={{borderRadius: 10}}
            //   onClick={() => navigate(`/movie/${res.id}`)}/>}
            // >
            // </Card>
            <img alt="example" src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} className='rounded-xl min-h-max shadow-md shadow-red-500'
            onClick={() => navigate(`/movie/${res.id}`)}/>
          )
        })
      }
    </div>
    </div>
    </div>
  );
}