import { useMemo } from 'react';
import styles from '../styles/Pagination.module.css';
import Button from './Button';

const Pagination = ({ pageCount, page, setPage }) => {
    const getVisiblePages = () => {
        const visiblePages = [];
        const maxVisible = 5; // Максимальное количество видимых страниц
        const halfVisible = Math.floor(maxVisible / 2);

        // Если страниц меньше или равно maxVisible, показываем все
        if (pageCount <= maxVisible) {
            for (let i = 1; i <= pageCount; i++) {
                visiblePages.push(i);
            }
            return visiblePages;
        }

        // Логика для первых страниц (1-5)
        if (page <= halfVisible + 1) {
            for (let i = 1; i <= maxVisible - 1; i++) {
                visiblePages.push(i);
            }
            visiblePages.push('...');
            visiblePages.push(pageCount);
            return visiblePages;
        }

        // Логика для последних страниц
        if (page >= pageCount - halfVisible) {
            visiblePages.push(1);
            visiblePages.push('...');
            for (let i = pageCount - (maxVisible - 2); i <= pageCount; i++) {
                visiblePages.push(i);
            }
            return visiblePages;
        }

        // Логика для средних страниц
        visiblePages.push(1);
        visiblePages.push('...');
        for (let i = page - halfVisible + 1; i <= page + halfVisible - 1; i++) {
            visiblePages.push(i);
        }
        visiblePages.push('...');
        visiblePages.push(pageCount);

        return visiblePages;
    };

    const visiblePages = useMemo(getVisiblePages, [page, pageCount]);

    return (
        <div className={styles.pagination}>
            {visiblePages.map((e, i) => {
                if (e === '...') {
                    return <span key={i} className="pagination_dots">...</span>;
                }
                return (
                    <Button
                        className={e === page ? `${styles.pagination_button} ${styles.select}` : styles.pagination_button}
                        key={i}
                        onClick={() => {
                            setPage(e)
                            window.scrollTo(0, 0)
                        }}
                    >
                        {e}
                    </Button>
                );
            })}
        </div>
    );
};

export default Pagination;