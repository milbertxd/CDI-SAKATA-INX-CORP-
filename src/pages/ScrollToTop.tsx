import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component scrolls the window to the top whenever the route changes.
function ScrollToTop() {
  // The `useLocation` hook returns the location object that represents the current URL.
  const { pathname } = useLocation();

  // The `useEffect` hook is used to perform side effects in function components.
  // This effect runs every time the `pathname` changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component does not render any visible UI, so it returns null.
  return null;
}

export default ScrollToTop;
