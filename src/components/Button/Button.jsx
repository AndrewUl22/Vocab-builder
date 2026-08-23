import styles from './Button.module.css';

const Button = ({ variant = 'primary', isLoading, children, ...rest }) => {
  return (
    <button
      className={`${styles.btn} ${variant === 'outline' ? styles.outline : ''}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? 'Please wait…' : children}
    </button>
  );
};

export default Button;
