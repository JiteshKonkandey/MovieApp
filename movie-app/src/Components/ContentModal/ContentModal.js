import React, { useState, useEffect } from 'react';
import Backdrop from "@mui/material/Backdrop";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousal from "../Carousal/Carousal";
import Box from "@mui/material/Box"
import "./ContentModal.css"
import {
    img_500,
    unavailable,
    unavailableLandscape,
} from "../../Config/Config";
import axios from "axios";
import { boxSizing } from '@mui/system';

const style = {
    color: "#ffffff",
    borderRadius: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '80%',
    bgcolor: '#39445a',
    border: '2px solid #282c34',
    boxShadow: 5,
    padding: "1,1,3",
};

export default function ContentModal({children, media_type, contentId}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const fetchModalData = async () => {
      const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${contentId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      setContent(data);
      console.log(data);
  }

  const fetchVideo = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${contentId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
        
    setVideo(data.results[0]?.key);
  };
  
  useEffect(() => {
    fetchModalData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div onClick={handleOpen} style={{ cursor: "pointer" }} color="inherit" className="media">{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <Box sx={style}>
                {content && (
                    <div>
                    <div className="ContentModal">
                        <img style={{borderRadius: "50px"}}
                        src={
                            content.poster_path
                            ? `${img_500}/${content.poster_path}`
                            : unavailable
                        }
                        alt={content.name || content.title}
                        className="ContentModal__portrait"
                        />
                        <img
                        src={
                            content.backdrop_path
                            ? `${img_500}/${content.backdrop_path}`
                            : unavailableLandscape
                        }
                        alt={content.name || content.title}
                        className="ContentModal__landscape"
                        />
                        <div className="ContentModal__about">
                        <span className="ContentModal__title">
                            {content.name || content.title} (
                            {(
                            content.first_air_date ||
                            content.release_date ||
                            "-----"
                            ).substring(0, 4)}
                            )
                        </span>
                        {content.tagline && (
                            <i className="tagline">{content.tagline}</i>
                        )}

                        <span className="ContentModal__description">
                            {content.overview}
                        </span>

                        <div>
                            {/* <Carousal contentId={contentId} media_type={media_type} /> */}
                        </div>

                        <Button
                            sx={{marginTop: "20px"}}
                            variant="contained"
                            startIcon={<YouTubeIcon />}
                            color="secondary"
                            target="__blank"
                            href={`https://www.youtube.com/watch?v=${video}`}
                        >
                            Watch the Trailer
                        </Button>
                        </div>
                    </div>
                    </div>
                )}
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}