import '../App';
import { useEffect } from "react";
import React from 'react';
import { Card, Button } from 'antd';
import {useNavigate} from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import {ArrowRightOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getUpcoming } from '../features/movies/moviesSlice'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";
import { ArrowRightIcon } from '@heroicons/react/24/outline';


export default function Upcoming() {
  const { Meta } = Card;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {upcoming, loading} = useSelector ((state) => state.movies)

  useEffect(() => {
    dispatch(getUpcoming())
  }, [dispatch])

  if (loading) return <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Loading...</p>

  return (
    <div className='bg-gray-900 mt-2'>
    <div className='flex justify-between px-6'>
      <h1 className='text-xl font-bold text-white border-l-2 border-l-red-500 pl-2'>Upcoming</h1>
      <Button style={{display: 'flex', alignItems: 'center', padding: 0}} danger type='link' onClick={() => navigate(`/movie`)}
      > View All <ArrowRightIcon className='flex text-red-500 w-4 ml-2'/></Button>
    </div>
    <div className='mx-6 lg:hidden'>
    <Swiper
        slidesPerView={3}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        // className="mySwiper"  
        className='px-2'
        >
      { upcoming &&
        upcoming.map((res) => {
          return(
            <SwiperSlide key={res.id} className='p-2 h-40'> 
            <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt="poster" className='rounded-xl shadow-md shadow-red-500 min-h-full cursor-pointer'
              onClick={() => navigate(`/movie/${res.id}`)}/>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
    </div>

    <div className='hidden mx-6 lg:block'>
    <Swiper
        slidesPerView={5}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        // className="mySwiper"  
        className='px-2'
        >
      { upcoming &&
        upcoming.map((res) => {
          return(
            <SwiperSlide key={res.id} className='p-2 h-40'> 
            <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt="poster" className='rounded-xl shadow-md shadow-red-500 min-h-full h-80 w-64 cursor-pointer'
              onClick={() => navigate(`/movie/${res.id}`)}/>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
    </div>
    </div>
  );
}
