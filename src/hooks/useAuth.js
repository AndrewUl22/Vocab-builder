import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectAuthError,
} from '../redux/auth/slice';

export const useAuth = () => ({
  user: useSelector(selectUser),
  isLoggedIn: useSelector(selectIsLoggedIn),
  isRefreshing: useSelector(selectIsRefreshing),
  error: useSelector(selectAuthError),
});
