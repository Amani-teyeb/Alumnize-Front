import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import AppAppBar from './intro/modules/views/AppAppBar';
import { getImages } from '../Redux/actions';

export default function PrixPage() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.auth.images);
  const PrixImages = images.filter((e) => e.nature === 'prix');

  useEffect(() => {
    dispatch(getImages());
  }, []);

  return (
    <>
      <AppAppBar />

      {PrixImages &&
        PrixImages.map((e) => {
          const { _id, image } = e;
          return (
            <Grid item xs={12} sm={6} md={3} mb={5} mt={12} ml={40}>
              <img src={image} alt="login" />
            </Grid>
          );
        })}
    </>
  );
}
