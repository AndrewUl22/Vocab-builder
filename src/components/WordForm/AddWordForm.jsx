import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../redux/categories/slice';
import { addWordSchema } from '../../schemas/validationSchemas';
import LanguageField from '../LanguageField/LanguageField';
import Button from '../Button/Button';
import styles from './WordForm.module.css';

const AddWordForm = ({ onSubmit, onCancel, isSubmitting }) => {
  const categories = useSelector(selectCategories);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addWordSchema),
    mode: 'onSubmit',
    defaultValues: { category: '', isIrregular: undefined, en: '', ua: '' },
  });

  const category = watch('category');
  const isIrregular = watch('isIrregular');

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.fieldGroup}>
        <select className={styles.select} {...register('category')} aria-label="Category">
          <option value="">Select category</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.category && <p className={styles.errorText}>{errors.category.message}</p>}
      </div>

      {category === 'verb' && (
        <div className={styles.verbGroup}>
          <Controller
            name="isIrregular"
            control={control}
            render={({ field }) => (
              <div className={styles.radioGroup} role="radiogroup" aria-label="Verb type">
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                  />
                  Regular
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                  />
                  Irregular
                </label>
              </div>
            )}
          />
          {isIrregular && (
            <p className={styles.hint}>
              Such data must be entered in the format I form-II form-III form.
            </p>
          )}
        </div>
      )}
      {errors.isIrregular && <p className={styles.errorText}>{errors.isIrregular.message}</p>}

      <LanguageField lang="ua" placeholder="Ukrainian translation" error={errors.ua?.message} {...register('ua')} />
      <LanguageField lang="en" placeholder="English word" error={errors.en?.message} {...register('en')} />

      <div className={styles.actions}>
        <Button type="submit" fullWidth={false} onGreen isLoading={isSubmitting}>
          Add
        </Button>
        <Button type="button" fullWidth={false} variant="outline" onGreen onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddWordForm;
