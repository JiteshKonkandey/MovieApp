import React, { useEffect, useState } from 'react';
import "../../App.css";
import SingleContent from '../../Components/SingleContent/SingleContent';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import Genres from '../../Components/Genres/Genres';
import useGenre from '../../Components/Hooks/useGenre';
import axios from "axios";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([])
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  const fetchSeriesData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`);

    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    fetchSeriesData();
    // eslint-disable-next-line
  },[page, genreforURL]);

  return (
    <>
      <span className='pageTitle'>Discover Series</span>
      <Genres type="tv"
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
          media_type="tv"
          rating={specificContent.vote_average}
        /> 
        
        ))}
            </div>
            {numOfPages > 1 && 
              <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            }
    </>
  )
}

export default Series