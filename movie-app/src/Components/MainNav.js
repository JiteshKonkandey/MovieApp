import React,{ useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import "../Components/Header/Header.css";

const BottomNavBox = styled(Box)`
    width: 100%;
    height: 8vh;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2d313a;
    ${'' /* bottom: 0; */}
    z-index: 100;
    padding: 0% 5%;
    @media only screen and (min-width: 1024px) {
        height: 10vh;
    }
`;

const BottomMainNavigation = styled(BottomNavigation)`
    background-color: #2d313a !important;
    height: 8vw;
    width: 34vw;
    @media only screen and (min-width: 1024px) {
      width: 37vw;
    }
    
`;

const Logo = styled.span`
  font-size: 35px;
  color: white;
  font-family: "Satisfy";

`;

const BottomNavigationActionBox = styled(BottomNavigationAction)`
  .MuiBottomNavigationAction-label {
    font-size: 1.438rem !important;
    @media only screen and (min-width: 1024px) {
      font-size: 1rem !important;
    }
  }
`;

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

    useEffect(() => {
        if(value === 0) {
            navigate("/");
        } else if(value === 1) {
            navigate("/movies")
        } else if (value === 2) {
            navigate("/series")
        }else {
            navigate("search")
        }
    },[value, navigate])

  return (
    <BottomNavBox>
        <Logo onClick={() => window.scroll(0, 0)}>🎬 MY MOVIE STORE 🎥</Logo>
      <BottomMainNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
      
        <BottomNavigationActionBox style={{color: "white"}} label="Trending" icon={<WhatshotIcon style={{width: "3vw", height: "3vh"}}/>} />
        <BottomNavigationActionBox style={{color: "white"}} label="Movies" icon={<MovieCreationIcon style={{width: "3vw", height: "3vh"}} />} />
        <BottomNavigationActionBox style={{color: "white"}} label="Tv Shows" icon={<TvIcon style={{width: "3vw", height: "3vh"}} />} />
        <BottomNavigationActionBox style={{color: "white"}} label="Search" icon={<SearchIcon style={{width: "3vw", height: "3vh"}} />} />
      
      </BottomMainNavigation>
    </BottomNavBox>
  );
}
