import styles from '../styles/Card.module.css';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const Card = ({
    type = 'news', // 'news', 'addition', 'event'
    gridClasses = '', // 'grid-item-w2 grid-item-h1' etc.
    imageUrl,
    imageAlt = 'Item image',
    imageType = 'normal', // 'normal', 'small', 'fullHeight'
    title,
    date,
    author,
    location,
    description,
    linkText = 'more',
    linkHref = '#',
    iconClass, // for event cards e.g. "fas fa-chalkboard-teacher"
    delay = 0,
    children, // Allow passing extra content if needed
    className = "",
    topOnClick = false
}) => {

    const cardTypeClass = styles[type] || styles.news; // Default to news styles
    const imageSizeClass = styles[imageType] || '';

    // Combine grid classes from props with base class
    const gridClassNames = gridClasses.split(' ').map(cls => styles[cls] || '').join(' ');

    const animationDelay = { '--animation-delay': `${delay * 0.1}s` };

    const isOverlay = imageType === 'fullHeight';

    const [t] = useTranslation()

    return (
        <article
            className={`${className} ${styles.itemCard} ${cardTypeClass} ${gridClassNames}`}
            style={animationDelay}
        >
            {iconClass && !imageUrl && ( // Event card without image
                <div className={styles.eventIcon}>
                    <i className={iconClass}></i>
                </div>
            )}

            {imageUrl && (
                <div className={styles.cardImageWrapper}>
                    <img
                        loading='lazy'
                        src={imageUrl}
                        alt={imageAlt}
                        className={`${styles.itemImage} ${imageSizeClass}`}
                    />
                </div>
            )}

            <div className={`${styles.cardContent} ${isOverlay ? styles.overlayContent : ''} ${imageUrl ? '' : styles.noImage}`}>
                {title && <h3>{title}</h3>}
                {date && <p className={styles.date}><i className="far fa-calendar-alt"></i> {date}</p>}
                {author && <p className={styles.author}>{author}</p>}
                {location && <p className={styles.location}><strong>{t('place')}:</strong> {location}</p>}
                {description && <p className={styles.description}>{description}</p>}
                {children} {/* Render any additional children */}
                <Link to={linkHref} className={styles.cardLink} onClick={() => { if (topOnClick) window.scrollTo(0, 0) }}>
                    {t(linkText)} <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
            {/* Добавляем пустой блок контента для карточек с картинкой на всю высоту,
          чтобы сетка правильно расчитала высоту, если overlayContent абсолютно позиционирован */}
            {isOverlay && <div className={styles.cardContent}></div>}
        </article>
    );
};

export default Card;