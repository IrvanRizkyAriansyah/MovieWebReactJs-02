import '../App';
import { useEffect } from "react";
import React from 'react';
import {useParams} from 'react-router-dom';
import Credit from './Credit';
import Navbar from './Nav';
import ButtonTrailer from '../component/ButtonTrailer';
import {StarOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../features/movies/detailSlice'


export default function Detail() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const {detail, genre, rating, loading} = useSelector((state) => state.detail)

  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch, id])

  if (loading) return <p style={{display: 'flex', justifyContent: 'center'}}>Loading...</p>

  return (
    <>
    <Navbar />
    <div className='bg-gray-900 max-w-7xl lg:overflow-hidden'>
    <div style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(17, 24, 39, 1)), url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
        backgroundSize: 'cover',
      }} className='flex mt-16 p-6 items-center'>
    <img src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`} alt="poster" className='rounded-lg h-48 mr-4 drop-shadow-lg lg:h-96'/>
    <div>
    <h1 className='font-extrabold text-white text-3xl'>{detail.title}</h1>
    <div style={{display: 'flex'}}>
    {genre.map((res, index) =>{
        return (
          <p className='text-white border-white border-2 px-2 rounded-full w-auto mr-2 text-center'>{res.name}</p>
        )}
      )}
    </div>
    <h5 style={{display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#fff', marginBottom: '1rem'}}>
    <StarOutlined style={{color: "yellow", marginRight: '0.5rem'}}/>{rating} / 10 </h5>
    <ButtonTrailer title={detail.title} />
    <h1 className='hidden text-lg font-bold mt-2 ml-6 text-white border-l-2 border-l-red-500 pl-2 lg:block lg:ml-0'>Synopsis</h1>
    <p className='hidden text-white text-justify ml-6 mr-6 lg:block lg:ml-0'>{detail.overview}</p>
    </div>
    </div>
    <h1 className='text-lg font-bold mt-2 ml-6 text-white border-l-2 border-l-red-500 pl-2 lg:hidden'>Synopsis</h1>
    <p className='text-white text-justify ml-6 mr-6 lg:hidden'>{detail.overview}</p>
    <Credit id={id}/>
    </div>
    </> 
  );
}
