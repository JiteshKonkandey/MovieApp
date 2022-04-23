import React from 'react';
import  "./SingleContent.css";
import { img_300, unavailable } from '../../Config/Config';
import { Badge } from '@mui/material';
import ContentModal from '../ContentModal/ContentModal';
import styled from 'styled-components';

const BadgeBox = styled(Badge)`
  .css-106c1u2-MuiBadge-badge{
    width: 30px;
    height: 25px;
    font-size: 1rem;
    font-weight: 800;
  }
`;

const SingleContent = ({
    contentId,
    poster,
    title,
    date,
    media_type,
    rating

}) => {
  return (
   
        <ContentModal media_type={media_type} contentId={contentId}>
            <BadgeBox badgeContent={rating} color={rating>6? "primary" : "secondary"}/>
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <h1 className='title'>{title}</h1>
          
                <span className='subTitle'>{media_type === "tv" ? "Tv Series" : "Movies"} <span className='subTitle'>{date}</span></span>
                
        
        </ContentModal>
  )
}

export default SingleContent;