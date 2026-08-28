import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editWordSchema } from '../../schemas/validationSchemas';
import LanguageField from '../LanguageField/LanguageField';
import Button from '../Button/Button';
import styles from './WordForm.module.css';

const EditWordForm = ({ word, onSubmit, onCancel, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editWordSchema),
    mode: 'onSubmit',
    defaultValues: { en: word.en, ua: word.ua },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <LanguageField lang="ua" placeholder="Ukrainian translation" error={errors.ua?.message} {...register('ua')} />
      <LanguageField lang="en" placeholder="English word" error={errors.en?.message} {...register('en')} />

      <div className={styles.actions}>
        <Button type="submit" fullWidth={false} onGreen isLoading={isSubmitting}>
          Save
        </Button>
        <Button type="button" fullWidth={false} variant="outline" onGreen onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditWordForm;
