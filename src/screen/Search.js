import '../App';
import { useEffect } from "react";
import React from 'react';
import { Card } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Navbar from './Nav';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../features/movies/searchSlice';

export default function Search() {
  const {query} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {search, loading} = useSelector ((state) => state.search)

  useEffect(() => {
    dispatch(getSearch(query))
  }, [query, dispatch])

  if (loading) return 
  <p 
    style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    Loading...
  </p>

  return (
    <div className='bg-gray-900 max-w-7xl'>
    <Navbar />
    <Header query={'All Movies "'+query+'"'} />
    <div className='bg-gray-900 px-6'>
    <h2 className='text-lg font-bold text-white border-l-2 border-l-red-500 pl-2 my-4'>Search Result "{query}"</h2>
    <div className='grid grid-cols-2 gap-6 lg:grid-cols-5'>
      { search &&
        search.filter(function(e){
          return e.poster_path !== null 
        }).map((res, index) => {
          return(
            // <Card
            //   hoverable key={res.id}
            //   style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
            //   bodyStyle={{ padding: 0, objectFit: 'cover' }}
            //   cover={<img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt={res.title} style={{borderRadius: 10, objectFit: 'çover'}}
            //   />}
            // onClick={() => navigate(`/movie/${res.id}`)}
            // />
            <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt={res.title} className='rounded-xl min-h-max shadow-md shadow-red-500 h-80 w-64 object-cover'
            onClick={() => navigate(`/movie/${res.id}`)}
            />
          )
        })
      }
    </div>
    </div>
    </div>
  );
}
