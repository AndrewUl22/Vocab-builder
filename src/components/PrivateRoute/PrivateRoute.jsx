import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/slice';

// Wrap any page that requires authentication:
// <Route path="/dictionary" element={<PrivateRoute><DictionaryPage /></PrivateRoute>} />
const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
