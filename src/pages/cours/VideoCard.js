

import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Title } from '@mui/icons-material';

// utils
//


// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: '0',
});

const StyledTitle = styled(Link)({
  height: 20,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  
});

// ----------------------------------------------------------------------

VideoCard.propTypes = {
    course: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function VideoCard({ course, index }) {
  const { url, titre, _id, theme} = course;
 

  return (
   
    <Grid item xs={6} sm={3} margin={2}>
      <Card sx={{ position: 'relative' }} >
        <StyledCardMedia>
          <iframe src={url} id={course._id} title={titre} width='100%'   />     
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            paddingTop: '0px'
          }}
        >

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            href= {`courseDetails/${_id}`}
            sx={{
                 height: 40 ,
                color: 'blue',    
            }}
          >
            {titre}
          </StyledTitle>
        </CardContent>
      </Card>
    </Grid>
  );
}
