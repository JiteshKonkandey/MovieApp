import React, { useState, useEffect } from "react";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from "@mui/material";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState({});
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
        placeholder: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try{
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=41f5a1c86861f19f74fc7647ac1cc36d&language=en-US&page={page}&include_adult=false&query=${searchText}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    }catch (error) {
      console.error(error);
    }
    
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display: "flex", margin: "15px 0px"}}>
          <TextField
            sx={{
              "& .MuiFilledInput-root": {
                color: "",
              },
            }}
            style={{flex: 1}}
            hiddenLabel
            id="filled-hidden-label-normal"
            placeholder="Search"
            variant="filled"
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "white",
                },
              },
            }}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
          <SearchIcon fontSize="large"/>
          </Button>
        </div>
        <Tabs value={type} indicatorColor="primary" textColor="primary"  
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{paddingBottom: 5}}
          >
            <Tab style={{width: "50%"}} label="Search Movies"/>
            <Tab style={{width: "50%"}} label="Search Tv Series"/>

        </Tabs>
      </ThemeProvider>
      <div className="trending-page">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText !== content && (type ? <h2>"No Series Found"</h2> : <h2>"No Movies Found"</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      )}
    </div>
  );
};

export default Search;
