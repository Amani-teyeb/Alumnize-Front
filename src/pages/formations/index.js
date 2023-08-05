import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';

// mock

import { getAllCourses, getThemes } from '../../Redux/actions';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Courses() {
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.theme.themes);
  const user = useSelector((state) => state.auth.user);
  const course = useSelector((state) => state.course.courses);
  console.log(themes);
  useEffect(() => {
    dispatch(getThemes());
    dispatch(getAllCourses());
  }, []);

  return (
    <>
      <Container>
        <>Formations</>
        {/* {user && user.role === 'student' ? (
          <Grid container spacing={6} align="center" justifyItems={'space-arround'} mt={4}>
            {themes.map((theme, index) => (
              <CourseCard key={theme._id} theme={theme} index={index} />
            ))}
          </Grid>
        ) : (
          <TeacherCourse />
        )} */}
      </Container>
    </>
  );
}
