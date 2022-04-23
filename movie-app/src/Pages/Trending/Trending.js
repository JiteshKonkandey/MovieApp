import React,{ useState, useEffect } from 'react';
import "./Trending.css";
import "../../App.css";
import axios from "axios";
import Box from "@mui/material/Box"
import SingleContent from '../../Components/SingleContent/SingleContent';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import styled from "styled-components"

const Trending = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([]);

    const fetchTrendingData = async() => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`) //in this {data} --> we are giong to extract this data.
        // console.log(data)
        setContent(data.results);
    };

    useEffect(() => {
      fetchTrendingData();
      // eslint-disable-next-line
    }, [page]);
    
    const Boxx = styled(Box)`
        margin: 10px 70px;
    `;

        
    
  return (
        <>
            <Boxx>
            <span className='pageTitle'>Trending</span>
            <div className="trending-page">
                {content && content.map((specificContent) => (
                    <SingleContent 
                    key={specificContent.id} 
                    contentId={specificContent.id} 
                    poster={specificContent.poster_path} 
                    title={specificContent.title || specificContent.name} 
                    date={specificContent.first_air_date || specificContent.release_date}
                    media_type={specificContent.media_type}
                    rating={specificContent.vote_average}
                    />
                ))}
            </div>
            </Boxx>
            <CustomPagination setPage={setPage}/>
        </>
  )
}

export default Trending;