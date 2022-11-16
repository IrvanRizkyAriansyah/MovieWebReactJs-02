import React from 'react'
import { useEffect } from "react";
import ListGenre from './ListGenre';
import { Card } from 'antd';
import {useNavigate} from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../features/movies/moviesSlice'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";

export default function Genres() {
	const navigate = useNavigate()
  const dispatch = useDispatch()
  const {movies, loading} = useSelector ((state) => state.movies)

  useEffect(() => {
    dispatch(getMovies())
  }, [dispatch])

  if (loading) return <p style={{display: 'flex', justifyContent: 'center'}}>Loading...</p>

	return (
		<div className='px-6'>
    <div className='p-3 bg-gray-800 rounded-lg my-2'>
		<ListGenre />
    </div>
		<Swiper
        slidesPerView={3}
        freeMode={true}
        modules={[FreeMode, Pagination]}
      >
      { movies &&
        movies.map((res, index) => {
          return(
            <SwiperSlide key={res.id} className='p-2 h-40 lg:hidden'> 
            {/* <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto', margin: '0.5rem'}}
              bodyStyle ={{padding: 0}}
              cover={<img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt="poster" style={{borderRadius: 10}}
              onClick={() => navigate(`/movie/${res.id}`)}/>}
            />  */}
            <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt="poster" className='rounded-xl shadow-md shadow-red-500 min-h-full'
              onClick={() => navigate(`/movie/${res.id}`)} />
            </SwiperSlide>
          )
        })
      }
    </Swiper>

    <Swiper
        slidesPerView={5}
        freeMode={true}
        modules={[FreeMode, Pagination]}
      >
      { movies &&
        movies.map((res, index) => {
          return(
            <SwiperSlide key={res.id} className='hidden p-2 h-40 lg:block'> 
            {/* <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto', margin: '0.5rem'}}
              bodyStyle ={{padding: 0}}
              cover={<img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt="poster" style={{borderRadius: 10}}
              onClick={() => navigate(`/movie/${res.id}`)}/>}
            />  */}
            <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt="poster" className='rounded-xl shadow-md shadow-red-500 min-h-full lg:h-80'
              onClick={() => navigate(`/movie/${res.id}`)} />
            </SwiperSlide>
          )
        })
      }
    </Swiper>
		</div>
	)
}
