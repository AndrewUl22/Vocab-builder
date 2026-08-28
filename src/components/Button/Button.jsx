import styles from './Button.module.css';

const Button = ({
  variant = 'primary',
  isLoading,
  fullWidth = true,
  onGreen = false,
  className = '',
  children,
  ...rest
}) => {
  const greenClass = onGreen
    ? variant === 'outline'
      ? styles.onGreenOutline
      : styles.onGreenPrimary
    : '';

  return (
    <button
      className={`${styles.btn} ${variant === 'outline' ? styles.outline : ''} ${greenClass} ${fullWidth ? '' : styles.auto} ${className}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? 'Please wait…' : children}
    </button>
  );
};

export default Button;
