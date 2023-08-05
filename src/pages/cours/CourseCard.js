
import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// utils
//


// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 30,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

CourseCard.propTypes = {
  theme: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function CourseCard({ theme, index }) {
  const { name, image, slug} = theme;
 

  return (
   
    <Grid item  md={3} mb={5} >
      <Card sx={{ position: 'relative'}}  >
        <StyledCardMedia
         sx={{
            pt: 'calc(100% * 3 / 5)',
            '&:after': {
              top: 0,
              position: 'absolute',
              bgcolor: "#ECBDE7"
            }
        }}>
          <StyledCover alt={name} src={image} />
        </StyledCardMedia>

        <CardContent
          
          sx={{
            pt: 1,
            bgcolor:'#FAEDF9'
          }}
        >

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            href= {`courses/${slug}`}
            sx={{
                typography: 'h6', height: 30,
                color: 'blue',    
            }}
          >
            {name}
          </StyledTitle>
        </CardContent>
      </Card>
    </Grid>
  );
}
