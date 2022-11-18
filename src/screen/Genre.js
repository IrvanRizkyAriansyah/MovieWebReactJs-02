import '../App';
import { useEffect } from "react";
import React from 'react';
import { Card } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Navbar from './Nav';
import ListGenre from '../component/ListGenre';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchGenre } from '../features/movies/searchSlice';
import Footer from '../component/Footer';

export default function Search() {
  const {genre} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {searchGenre, loading} = useSelector((state) => state.search)

  useEffect(() => {
    dispatch(getSearchGenre(genre))
  }, [genre, dispatch])

  if (loading) return <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Loading...</p>

  return (
    <div className='bg-gray-900'>
    <Navbar />
    <Header query={'Genres "'+genre+'"'} />
    <h2 className='text-lg font-bold text-white border-l-2 border-l-red-500 pl-2 my-4 mx-6'>Browse by Category</h2>
    <div className='px-6'>
    {/* <ListGenre /> */}
    </div>
    <div className='grid grid-cols-2 gap-4 pt-4 px-6 lg:grid-cols-5'>
      { searchGenre &&
        searchGenre.filter(function(e){
          return e.poster_path !== null 
        }).map((res, index) => {
          return(
            // <Card key={res.id}
            //   hoverable
            //   style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
            //   bodyStyle={{ padding: 0, objectFit: 'cover' }}
            //   cover={<img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt={res.title} style={{borderRadius: 10}}/>}
            // onClick={() => navigate(`/movie/${res.id}`)}
            // />
            <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt={res.title} className='rounded-xl min-h-max shadow-md shadow-red-500 h-80 w-64 cursor-pointer'
            onClick={() => navigate(`/movie/${res.id}`)} />
          )
        })
      }
    </div>
    <Footer />
    </div>
  );
}
