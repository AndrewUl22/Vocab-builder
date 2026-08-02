import { useEffect, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { refreshUser } from './redux/auth/operations';
import { fetchCategories } from './redux/categories/operations';
import { selectIsRefreshing } from './redux/auth/slice';

import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';

const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const DictionaryPage = lazy(() => import('./pages/DictionaryPage/DictionaryPage'));
const RecommendPage = lazy(() => import('./pages/RecommendPage/RecommendPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage/TrainingPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Перевірка автентифікації...</div>;
  }

  return (
    <Routes>
      <Route
        path="/register"
        element={
          <RestrictedRoute>
            <RegisterPage />
          </RestrictedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute>
            <LoginPage />
          </RestrictedRoute>
        }
      />

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dictionary" replace />} />
        <Route
          path="dictionary"
          element={
            <PrivateRoute>
              <DictionaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="recommend"
          element={
            <PrivateRoute>
              <RecommendPage />
            </PrivateRoute>
          }
        />
        <Route
          path="training"
          element={
            <PrivateRoute>
              <TrainingPage />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/dictionary" replace />} />
    </Routes>
  );
}

export default App;
