import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';

// mock
import courses from '../../_mock/course';
import { getAllCourses, getThemes, getUserWishlist, getVideoCourses } from '../../Redux/actions';
import CourseCard from './CourseCard';
import TeacherCourse from './TeacherCourse';

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
  const wishlist = useSelector((state) => state.auth.wishlist);

  console.log(wishlist);

  const myThemes = themes.filter((t) => t.level === user.level);

  useEffect(() => {
    dispatch(getThemes());
    dispatch(getAllCourses());
    dispatch(getUserWishlist());
    dispatch(getVideoCourses());
  }, []);

  return (
    <>
      <Container>
        {user && user.role === 'student' ? (
          <Grid container display="flex" spacing={6} align="center" justifyItems={'space-arround'} mt={4}>
            {myThemes.map((theme, index) => (
              <CourseCard key={theme._id} theme={theme} index={index} add="تسجيل" />
            ))}
          </Grid>
        ) : (
          <TeacherCourse />
        )}
      </Container>
    </>
  );
}
