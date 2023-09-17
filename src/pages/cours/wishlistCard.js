import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { addToWishList } from '../../Redux/actions';

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

WishlistCard.propTypes = {
  theme: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function WishlistCard({ theme }) {
  const { _id, name, image } = theme;
  const dispatch = useDispatch();

  const addtoWishList = (id) => {
    dispatch(addToWishList(id));
  };

  return (
    <Grid item md={3} mb={5}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
            pt: 'calc(100% * 3 / 5)',
            '&:after': {
              top: 0,
              position: 'absolute',
              bgcolor: '#5F9EA0',
            },
          }}
        >
          <StyledCover alt={name} src={image} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 1,
            bgcolor: '#5F9EA0',
          }}
        >
          <StyledTitle
            color="inherit"
            variant="subtitle1"
            // href={`courses/${slug}`}
            sx={{
              typography: 'h6',
              height: 30,
              color: '#8B0000',
            }}
          >
            {name}
          </StyledTitle>

          <button style={{ width: '80%' }}>
            <StyledTitle
              color="inherit"
              variant="subtitle2"
              underline="hover"
              href={`courses/${_id}`}
              sx={{
                typography: 'h6',
                height: 30,
                color: 'black',
              }}
            >
              الدخول
            </StyledTitle>
          </button>
          <button style={{ width: '80%' }}>
            <StyledTitle
              color="inherit"
              variant="subtitle2"
              underline="hover"
              onClick={(e) => {
                addtoWishList(theme?._id);
              }}
              sx={{
                typography: 'h6',
                height: 30,
                color: 'black',
              }}
            >
              الغاء التسجيل
            </StyledTitle>
          </button>
        </CardContent>
      </Card>
    </Grid>
  );
}
