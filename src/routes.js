import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Cours from './pages/cours';
import Formation from './pages/formations';
import Home from './pages/intro/Home';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './HOC/PrivateRoutes';
import { CoursePage } from './pages/cours/CoursePage';
import { CourseDetails } from './pages/cours/CourseDetails';
import WishList from './pages/cours/WishList';
import EmploiPage from './pages/EmploiPage';
import PrixPage from './pages/PrixPage';
import VideoCourse from './pages/cours/videoCourse';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
      index: true,
    },
    {
      path: 'emploi',
      element: <EmploiPage />,
    },
    {
      path: 'prix',
      element: <PrixPage />,
    },
    {
      element: <PrivateRoute />,
      children: [
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            { element: <Navigate to="/dashboard/app" />, index: true },
            { path: 'app', element: <DashboardAppPage /> },
            { path: 'user', element: <UserPage /> },
            { path: 'cours', element: <Cours /> },
            { path: 'videoCourse', element: <VideoCourse /> },
            { path: 'formation', element: <Formation /> },
            { path: 'blog', element: <BlogPage /> },
            { path: 'wishlist', element: <WishList /> },
            { path: 'courses/:_id', element: <CoursePage />, index: true },
            { path: 'courses/courseDetails/:id', element: <CourseDetails /> },
          ],
        },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
