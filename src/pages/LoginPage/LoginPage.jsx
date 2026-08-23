import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import AuthLayout from '../../components/AuthLayout/AuthLayout';
import FormField from '../../components/FormField/FormField';
import PasswordField from '../../components/PasswordField/PasswordField';
import Button from '../../components/Button/Button';
import { loginSchema } from '../../schemas/validationSchemas';
import { logIn } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import styles from '../RegisterPage/RegisterPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dictionary', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (values) => {
    const result = await dispatch(logIn(values));
    if (logIn.rejected.match(result)) {
      toast.error(result.payload || 'Login failed. Check your email and password.');
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Please enter your login details to continue using our service:"
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.fields}>
          <FormField label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <PasswordField error={errors.password?.message} {...register('password')} />
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          Login
        </Button>

        <Link to="/register" className={styles.link}>
          Register
        </Link>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
