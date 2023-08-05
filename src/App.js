import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// routes
import Router from './routes';


// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { isUserLoggedIn } from "./Redux/actions";
// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />  {/* les differentes paths de barre de menu */}
    </ThemeProvider>
  );
}
