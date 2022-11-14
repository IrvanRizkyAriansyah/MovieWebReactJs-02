import '../App';
import { useEffect } from "react";
import React from 'react';
import { Card, Button } from 'antd';
import {useNavigate} from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import {ArrowRightOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../features/movies/moviesSlice'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";
import { ArrowRightIcon } from '@heroicons/react/24/outline';


export default function Trending() {
  // const [trend, setTrend] = useState([])
  // const navigate = useNavigate()
  
  // const loadTrend = async () => {
  //   try {
  //     await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
  //     params: {
  //       api_key: process.env.REACT_APP_TMBD_KEY
  //     }
  //   }).then((res) => {
  //     setTrend(res.data.results)
  //   })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  const { Meta } = Card;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {movies, loading} = useSelector ((state) => state.movies)

  useEffect(() => {
    dispatch(getMovies())
  }, [dispatch])

  if (loading) return <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Loading...</p>

  return (
    <div className='bg-gray-900'>
    <div className='flex justify-between px-6'>
      <h1 className='text-xl font-bold text-white border-l-2 border-l-red-500 pl-2'>Popular Movie</h1>
      <Button style={{display: 'flex', alignItems: 'center', padding: 0}} danger type='link' onClick={() => navigate(`/movie`)}
      > View All <ArrowRightIcon className='flex text-red-500 w-4 ml-2'/></Button>
    </div>
    <div className='mx-6'>
    <Swiper
        slidesPerView={3}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        // className="mySwiper"  
        className='px-2'
        >
      { movies &&
        movies.map((res) => {
          return(
            <SwiperSlide key={res.id} className='p-2 h-40'> 
            <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt="poster" className='rounded-xl shadow-md shadow-red-500 min-h-full'
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
