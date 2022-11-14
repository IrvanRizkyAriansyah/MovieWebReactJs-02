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

export default function Search() {
  // const [movie, setMovie] = useState([])
  // const {genre} = useParams()
  // const navigate = useNavigate()

  // const loadMovie = async () => {
  //   try {
  //     await axios.get(`${process.env.REACT_APP_BASE_URL}/search/movie`, {
  //     params: {
  //       api_key: process.env.REACT_APP_TMBD_KEY,
  //       query: `${genre}`
  //     }
  //   }).then((res) => {
  //     setMovie(res.data.results)
  //   })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(() => {
  //   loadMovie()
  // },[movie]);
  const {genre} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {searchGenre, loading} = useSelector((state) => state.search)

  useEffect(() => {
    dispatch(getSearchGenre(genre))
  }, [genre, dispatch])

  if (loading) return <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Loading...</p>

  return (
    <>
    <Navbar />
    <Header query={'Genres "'+genre+'"'} />
    <div className="container">
    <h2 style={{paddingBottom: '2rem'}}>Browse by Category</h2>
    <ListGenre />
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 15rem)', gap: '2rem', justifyContent: 'center'}}>
      { searchGenre &&
        searchGenre.filter(function(e){
          return e.poster_path !== null 
        }).map((res, index) => {
          return(
            <Card key={res.id}
              hoverable
              style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
              bodyStyle={{ padding: 0, objectFit: 'cover' }}
              cover={<img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt={res.title} style={{borderRadius: 10}}/>}
            onClick={() => navigate(`/movie/${res.id}`)}
            />
          )
        })
      }
    </div>
    </div>
    </>
  );
}
