import '../App';
import { useEffect } from "react";
import React from 'react';
import { Carousel,Skeleton } from 'antd';
import ButtonTrailer from '../component/ButtonTrailer';
import { useDispatch, useSelector } from 'react-redux';
import { getCarousel } from '../features/movies/moviesSlice'
import { CalendarIcon, StarIcon } from '@heroicons/react/24/outline';
import { getGenres } from '../features/movies/genresSlice';
import { StarOutlined } from '@ant-design/icons';

export default function Poster() {

  const dispatch = useDispatch()
  const {carousel, loading} = useSelector ((state) => state.movies)

  useEffect(() => {
    dispatch(getCarousel())
  }, [dispatch])

  if (loading) return (
    <div style={{
      height: '100vh', 
      backgroundColor: 'rgba(201,199,199,0.5)', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '2rem',
      paddingRight: '50%'
    }}>
    <Skeleton active delay={5000}/>  
    </div>
  )

  console.log(carousel)

  return (
    <div>
      <Carousel autoplay className='m-6'>
      { carousel &&
        carousel.map((res) => {
          return(
            <div key={res.id}>
              <div className='flex h-60 lg:h-80 items-center pl-8 mt-16 rounded-lg' style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${res.backdrop_path})`,
                backgroundSize: 'cover'
              }}>
              <div>
              <h1 className='font-extrabold text-white text-3xl'>{res.title}</h1>
              <div className='flex items-center'>
              <p className='text-red-500 w-4 mr-2'><CalendarIcon /></p>
              <p className='text-white font-bold text-xs mr-2'>{res.release_date}</p>
              <p className='text-yellow-500 w-4 mr-1'><StarIcon className='stroke-2'/></p>
              <p className='text-white font-bold text-xs rounded-md items-center'> {res.vote_average}</p>
              </div>
              <ButtonTrailer title={res.title} />
              </div>
              </div>
            </div>
          )
        })
      }
      </Carousel>
    </div>
  );
}
