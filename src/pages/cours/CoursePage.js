import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { getCourseBySlug } from '../../Redux/actions';
import VideoCard from './VideoCard';

export const CoursePage = (props) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const courses = useSelector((state) => state.course.courses);
  const auth = useSelector((state) => state.auth.user);

  const myCourses = courses.filter((c) => c.level === auth.level);
  console.log(courses);

  useEffect(() => {
    dispatch(getCourseBySlug(slug));
  }, []);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Courses
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {myCourses && myCourses.map((course, index) => <VideoCard key={course._id} course={course} index={index} />)}
        </Grid>
      </Container>
    </>
  );
};
