import '../App';
import { useEffect } from "react";
import React from 'react';
import { Carousel,Skeleton } from 'antd';
import ButtonTrailer from '../component/ButtonTrailer';
import { useDispatch, useSelector } from 'react-redux';
import { getCarousel } from '../features/movies/moviesSlice'

export default function Poster() {
  // const [trend, setTrend] = useState([])
  
  // const loadTrend = async () => {
  //   try {
  //     axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
  //     params: {
  //       api_key: process.env.REACT_APP_TMBD_KEY
  //     }
  //   }).then((res) => {
  //     let data = (res.data.results)
  //     if(data.length >= 3) { 
  //       data.splice(3);
  //       setTrend(data)
  //     }
  //   })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(() => {
  //   loadTrend()
  // }, [])

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
      paddingLeft: '6rem',
      paddingRight: '50%'
    }}>
    <Skeleton active delay={5000}/>  
    </div>
  )

  return (
    <div>
      <Carousel autoplay>
      { carousel &&
        carousel.map((res) => {
          return(
            <div key={res.id}>
              <div style={{
                display: 'flex',
                height: '100vh',
                color: '#fff',
                textAlign: 'left',
                paddingLeft: '6rem',
                paddingRight: '50%',
                alignItems: 'center',
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${res.backdrop_path})`,
                backgroundSize: 'cover'
              }}>
              <div>
              <h1 style={{fontWeight: 700, color: '#fff'}}>{res.title}</h1>
              <p>{res.overview}</p>
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
