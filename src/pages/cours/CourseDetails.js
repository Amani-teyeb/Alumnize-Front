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
  const auth = useSelector((state) => state.auth);
  const courses = useSelector((state) => state.course.courses);
  const course = courses.find((c) => c._id === id);
  useEffect(() => {
    dispatch(getAllCourses());
    console.log(auth);
  }, []);

  return (
    <Container>
      <Stack direction="col" backgoundColor="secondary.main" alignItems="center" justifyContent="space-arround" pl={16}>
        <iframe src={course && course.url} title={course && course.titre} height="600px" width="900px" />
      </Stack>
      {/* {auth && auth.verified === true ? (
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
          <Box sx={{ bgcolor: 'red', height: '20vh', alignContent: 'center' }}>
            <Typography variant="h4" sx={{ marginLeft: '100px' }}>
              {' '}
              الرجاء دفع معلوم الاشتراك او الاتصال بالادارة
            </Typography>
          </Box>
        </Container>
      )} */}
    </Container>
  );
};
