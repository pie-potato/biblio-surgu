import styles from '../styles/Section.module.css';

const Section = ({ children, title, titleAlign = 'center', className = '', width }) => {
    return (
        <section className={`${className} ${styles.section}`} style={width && { width: `${width}%` }}>
            <div className={styles.sectionContainer}> {/* Глобальный контейнер */}
                {title && (
                    <h2 className={styles.sectionTitle} style={{ textAlign: titleAlign }}>
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;