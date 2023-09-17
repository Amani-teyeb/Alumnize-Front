import { Container, Stack, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { getAllCourses } from '../../Redux/actions';
import Typography from '../intro/modules/components/Typography';

export const CourseDetails = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const auth = useSelector((state) => state.auth.user);
  const courses = useSelector((state) => state.course.courses);
  const course = courses.find((c) => c._id === id);
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  return (
    <Container>
      {auth && auth.verified === true ? (
        <Stack
          direction="col"
          backgoundColor="secondary.main"
          alignItems="center"
          justifyContent="space-arround"
          pl={16}
        >
          <iframe src={course && course.url} title={course && course.titre} height="600px" width="900px" />
        </Stack>
      ) : (
        <Container maxWidth="sm">
          <CssBaseline />
          <Box sx={{ bgcolor: '#cfe8fc', height: '50vh' }}>
            <Typography> الرجاء دفع معلوم الاشتراك او الاتصال بالادارة</Typography>
          </Box>
        </Container>
      )}
    </Container>
  );
};
