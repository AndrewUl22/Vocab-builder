import styles from './Button.module.css';

const Button = ({ variant = 'primary', isLoading, fullWidth = true, className = '', children, ...rest }) => {
  return (
    <button
      className={`${styles.btn} ${variant === 'outline' ? styles.outline : ''} ${fullWidth ? '' : styles.auto} ${className}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? 'Please wait…' : children}
    </button>
  );
};

export default Button;
