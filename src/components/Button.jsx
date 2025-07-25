import styles from '../styles/Button.module.css';
import { Link } from 'react-router';

const Button = ({ children, variant = 'primary', href, onClick, type = 'button', className = '', ...props }) => {
  const buttonClasses = `${styles.btn} ${styles[variant]} ${className}`; // variant -> styles.primary, styles.secondary, etc.

  if (href) {
    return (
      <Link to={href} className={buttonClasses} {...props} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;