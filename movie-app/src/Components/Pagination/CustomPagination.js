import React from 'react';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        type: "dark"
    }
})

const CustomPagination = ({setPage, numOfPages = 10}) => {
    const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0,0);
    } 
  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "10px", backgroundColor: "white"}}>
            <ThemeProvider theme={darkTheme}>
                <Pagination count={numOfPages} onChange={(event) => handlePageChange(event.target.textContent)} color="red"/>
            </ThemeProvider>
    </div>
  )
}

export default CustomPagination