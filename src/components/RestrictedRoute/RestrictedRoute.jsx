import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/slice';

// Wrap Register/Login pages so a logged-in user can't revisit them:
// <Route path="/login" element={<RestrictedRoute><LoginPage /></RestrictedRoute>} />
const RestrictedRoute = ({ children, redirectTo = '/dictionary' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
