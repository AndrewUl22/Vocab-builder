import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editWordSchema } from '../../schemas/validationSchemas';
import FormField from '../FormField/FormField';
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
      <FormField label="En" error={errors.en?.message} {...register('en')} />
      <FormField label="Ua" error={errors.ua?.message} {...register('ua')} />

      <div className={styles.actions}>
        <Button type="submit" fullWidth={false} isLoading={isSubmitting}>
          Save
        </Button>
        <Button type="button" fullWidth={false} variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditWordForm;
