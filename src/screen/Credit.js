import '../App';
import { useEffect } from "react";
import React from 'react';
import { Card } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux';
import { getCredit } from '../features/movies/creditSlice';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";

export default function Credit(props) {
  const { Meta } = Card;
  const dispatch = useDispatch()
  const {cast,crew, loading} = useSelector((state) => state.credit)

  useEffect(() => {
    dispatch(getCredit(props.id))
  }, [dispatch, props.id])

  if (loading) return <p style={{display: 'flex', justifyContent: 'center'}}>Loading...</p>

  return (
    <div className='px-6 mt-4'>
    <h2 className='font-bold text-lg text-white border-l-2 border-l-red-500 pl-2'>All Cast</h2>
    <Swiper
        slidesPerView={3}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
      { cast &&
        cast.filter(function(e){
          return e.profile_path !== null 
        }).map((res, index) => {
          return(
            <SwiperSlide> 
            <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto', margin: '0.5rem'}}
              bodyStyle ={{padding: '1rem', maxHeight: '4.5rem'}}
              cover={<img src={`https://image.tmdb.org/t/p/w500${res.profile_path}`} alt={res.name} style={{borderRadius: 10}} />}
            >
              <Meta title={res.name} description={res.character} />
            </Card>
            </SwiperSlide>
          )
        }) 
      }
    </Swiper>
    <h2 className='font-bold text-lg text-white border-l-2 border-l-red-500 pl-2 mt-2'>All Crew</h2>
    <Swiper
        slidesPerView={3}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
      { crew &&
          crew.filter(function(e){
            return e.profile_path !== null 
          }).map((res, index) => {
            return(
              <SwiperSlide> 
              <Card
                hoverable key={res.id}
                style={{ borderRadius: 10, width: 'auto', height: 'auto', margin: '0.5rem'}}
                bodyStyle ={{padding: '1rem', maxHeight: '4.5rem'}}
                cover={<img src={`https://image.tmdb.org/t/p/w500${res.profile_path} `} alt={res.name} style={{borderRadius: 10}} />}
              >
                <Meta title={res.name} description={res.job} />
              </Card>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  );
}
