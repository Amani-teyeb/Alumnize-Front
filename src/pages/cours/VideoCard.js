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
  const { url, titre, _id, group } = course;

  return (
    <Grid item md={3} mb={5}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia>
          <iframe src={url} id={course._id} title={titre} width="100%" />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            paddingTop: '20px',
            bgcolor: '#A3AFAC',
            display: 'flow-root',
            alignContent: 'center',
          }}
        >
          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            href={`courseDetails/${_id}`}
            sx={{
              typography: 'h6',
              height: 30,
              color: '#8B0000',
            }}
          >
            {titre}
          </StyledTitle>
          <button style={{ width: '80%' }}>
            <StyledTitle
              color="inherit"
              variant="subtitle2"
              underline="hover"
              href={`courseDetails/${_id}`}
              sx={{
                typography: 'h6',
                height: 30,
                color: 'black',
              }}
            >
              {group}
            </StyledTitle>
          </button>
        </CardContent>
      </Card>
    </Grid>
  );
}
