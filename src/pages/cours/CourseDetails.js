import { Container, Stack, Box } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch,  useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllCourses} from '../../Redux/actions';
import Typography from '../intro/modules/components/Typography';


export const CourseDetails = (props) => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const courses = useSelector(state => state.course.courses)
console.log(id)
const course = courses.find((c) => c._id === id)
console.log(course)
useEffect(() => {
    dispatch(getAllCourses());
}, []);

  return(
    <Container >
      <Stack direction="col" backgoundColor="secondary.main" alignItems="center" justifyContent="space-arround" pl={16} >
       <iframe src={course && course.url} id={course &&course._id} title={course &&course.titre} height='800px' width='800px'  />
       </Stack>
       <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h6" gutterBottom marked="center" align="center">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Box>
    </Container>
   
   )

 }