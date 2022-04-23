import React, { useState, useEffect } from 'react';
import "../../App.css";
import SingleContent from '../../Components/SingleContent/SingleContent';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import Genres from '../../Components/Genres/Genres';
import useGenre from '../../Components/Hooks/useGenre';
import axios from "axios";
import "./Movies.css";



const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages,setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);


  const fetchMoviesData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`)
    // console.log(data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    fetchMoviesData();
    // eslint-disable-next-line
  },[page, genreforURL]);


  return (
    <>
      <span className='pageTitle'>Movies</span>
      <div className='moviesPage'>
        <Genres type="movie"
          selectedGenres={selectedGenres}
          setSeletedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}

        />
        
        <div className="trending-page">
          {content && content.map((specificContent) => (
            <SingleContent 
            key={specificContent.id} 
            contentId={specificContent.id} 
            poster={specificContent.poster_path} 
            title={specificContent.title || specificContent.name} 
            date={specificContent.first_air_date || specificContent.release_date}
            media_type="movie"
            rating={specificContent.vote_average}
          />
          ))}
              {numOfPages > 1 && 
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
              }
              </div>
      </div>
    </>
  )
}

export default Movies;