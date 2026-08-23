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
import { registerSchema } from '../../schemas/validationSchemas';
import { register as registerThunk } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dictionary', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (values) => {
    const result = await dispatch(registerThunk(values));
    if (registerThunk.rejected.match(result)) {
      toast.error(result.payload || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Register"
      subtitle="To start using our services, please fill out the registration form below. All fields are mandatory:"
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.fields}>
          <FormField label="Name" error={errors.name?.message} {...register('name')} />
          <FormField label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <PasswordField error={errors.password?.message} {...register('password')} />
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          Register
        </Button>

        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
