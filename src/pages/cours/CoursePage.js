import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { getAllCourses, getCourseBySlug } from '../../Redux/actions';
import VideoCard from './VideoCard';

export const CoursePage = (props) => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  console.log(_id);
  const courses = useSelector((state) => state.course.courses);
  const auth = useSelector((state) => state.auth);

  // const mycourse = useSelector((state) => state.mycourse);

  // const [courseItems, setCourseItems] = useState(mycourse.courseItems);

  const myCourses = courses.filter((c) => c.level === auth.user.level && c.theme === _id);

  console.log(myCourses);
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  // useEffect(() => {
  //   setCourseItems(mycourse.courseItems);
  // }, [mycourse.courseItems]);

  // useEffect(() => {
  //   if (auth.authenticate) {
  //     dispatch(getMyCourses());
  //   }
  // }, [auth.authenticate]);

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
