import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card } from '@mui/material';
import { useSelector } from 'react-redux';
// components
import MyCalendar from '../sections/@dashboard/app/MyCalendar';
import Iconify from '../components/iconify';
// sections
import { AppTasks } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [date, setDate] = useState(new Date());
  const user = useSelector((state) => state.auth.user);

  const onChange = (date) => {
    setDate(date);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          H-tag academy
        </Typography>

        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} sm={6} md={3} mb={5}>
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                backgroundImage: 'url(/assets/images/covers/cover_21.jpg)',
              }}
            >
              <img src="/assets/images/covers/cover_21.jpg" alt="login" />

              <Typography variant="subtitle3" sx={{ opacity: 0.72 }}>
                Step by Step
              </Typography>
            </Card>
            {/* <img src="/assets/images/covers/cover_9.jpg" alt="login" /> */}
          </Grid>

          <Grid item xs={12} sm={6} md={3} mb={5}>
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                backgroundImage: 'url(/assets/images/covers/cover_23.jpg)',
              }}
            >
              <img src="/assets/images/covers/cover_23.jpg" alt="login" />

              <Typography variant="subtitle3" sx={{ opacity: 0.72 }}>
                Enjoy your time
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} mb={5}>
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                backgroundImage: 'url(/assets/images/covers/cover_17.jpg)',
              }}
            >
              <img src="/assets/images/covers/cover_17.jpg" alt="login" />

              <Typography variant="subtitle3" sx={{ opacity: 0.72 }}>
                Take the Right Way
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3} mb={5}>
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                backgroundImage: 'url(/assets/images/covers/cover_3.jpg)',
              }}
            >
              <img src="/assets/images/covers/cover_3.jpg" alt="login" />

              <Typography variant="subtitle3" sx={{ opacity: 0.72 }}>
                Succeed
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={8} mr={10}>
            {/* <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            /> */}
          </Grid>
          <MyCalendar />
        </Grid>
      </Container>
    </>
  );
}
