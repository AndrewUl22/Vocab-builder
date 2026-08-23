import Logo from '../Logo/Logo';
import illustration from '../../assets/images/auth-illustration.webp';
import illustration2x from '../../assets/images/auth-illustration@2x.webp';
import styles from './AuthLayout.module.css';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo to="/login" />
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {children}
        </div>

        <figure className={styles.illustration}>
          <img
            src={illustration}
            srcSet={`${illustration} 1x, ${illustration2x} 2x`}
            alt="Couple reading books together"
            width={498}
            height={423}
            loading="eager"
          />
          <figcaption className={styles.caption}>
            Word&nbsp;&middot;&nbsp;Translation&nbsp;&middot;&nbsp;Grammar&nbsp;&middot;&nbsp;Progress
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default AuthLayout;
