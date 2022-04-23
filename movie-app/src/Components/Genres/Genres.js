import React, { useEffect } from 'react';
import axios from "axios";
import Chip from '@mui/material/Chip';
import styled from 'styled-components';

const ChipItem = styled(Chip)`
    .MuiButtonBase-root {
        font-size: 1.375rem;
    }
`;

const Genres = ({
    selectedGenres,
    setSeletedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {
    const handleAdd = (genre) => {
        setSeletedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((gen) => gen.id !== genre.id))
        setPage=(1)
    }
    const handleRemove = (genre) => {
        setSeletedGenres(selectedGenres.filter((selected) => selected.id !== genre.id))
        setGenres([...genres, genre])
        setPage(1);
    }
   
    const fetchGenres = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setGenres(data.genres);
};
console.log(genres);

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line
  },[]);
  return (
   <div style={{ padding: "6px 0px"}}>

        {selectedGenres ? selectedGenres.map((genre) => {
           return (
           <ChipItem 
           label={genre.name} 
           style={{margin: 2}} 
           key={genre.id} 
           clickable
           color='primary'
           size="small"
           onDelete={() => handleRemove(genre)}
           />
           
           )
       }
       ) : "Sorry!! Not Found..."}

       {genres ? genres.map((genre) => {
           return (
           <Chip 
           label={genre.name} 
           style={{margin: 2, color: "black", backgroundColor: "#beb9c3", fontFamily: "fangsong", padding: "1rem", fontSize: "1.375rem", fontWeight: 500}} 
           key={genre.id} 
           clickable 
           size="small"
           onClick={() => handleAdd(genre)}
           />
           
           )
       }
       ) : "Sorry!! Not Found..."} 
   </div>
    )
  }

export default Genres;