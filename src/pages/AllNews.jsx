import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import styles from "../styles/AllNews.module.css"
import Section from "../components/Section"
import Card from "../components/Card"
import MosaicGrid from "../components/MosaicGrid"
import Pagination from "../components/Pagination"
import { useFetch } from "../hooks/useFetch";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function AllNewsPage() {

    const [news, setNews] = useState([]) // State для списка новостей
    const [page, setPage] = useState(1) // State текущей страницы
    const [pageCount, setPageCount] = useState(0) // State для количества страниц
    const { getUrl } = useFetch() // Функция для генерации API запроса
    const { language } = useLanguage() // Глобальная переменная языка
    const [t] = useTranslation() // Функция i18n для перевода
    const [tags, setTags] = useSearchParams() // Теги в поисковых параметрах строки
    const [isTagsOptionOpen, setIsTagsOptionOpen] = useState(false) // State для открытия списка тегов новостей
    const [newsTags, setNewsTags] = useState([]) // State для поиска новостей по тегам
    const [searchTagsTerm, setSearchTagsTerm] = useState('') // State для поиска тегов новостей
    const [searchNewsTerm, setSearchNewsTerm] = useState('') // State для поиска новостей по ключевым словам
    const [searchNewsDate, setSearchNewsDate] = useState('') // State для поиска новостей по дате
    const [timer, setTimer] = useState(null) // State таймера 

    // Функция получения списка новостей 
    const fetchNews = async () => {
        try {
            const response = await axios.get(
                getUrl(
                    `/api/news?sort[0]=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=10&populate=picture${tags.get("tags")
                        ?
                        tags.get("tags").split(",").map((e, i) => `&filters[news_tags][title][$in][${i}]=${e}`).toString().replaceAll(',', '')
                        :
                        ''
                    }&filters[name][$containsi]=${searchNewsTerm.length > 0
                        ?
                        searchNewsTerm
                        :
                        ''
                    }${searchNewsDate
                        ?
                        `&filters[createdAt][$between][0]=${new Date(searchNewsDate).toISOString()}&filters[createdAt][$between][1]=${new Date(searchNewsDate).toISOString().split('T')[0]}T23:59:59.999Z`
                        :
                        ' '
                    }`
                )
            )
            setNews(response.data.data)
            if (pageCount !== response.data.meta.pagination.pageCount) {
                setPageCount(response.data.meta.pagination.pageCount)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Функция получения списка тегов
    const fetchNewsTags = async () => {
        try {
            const response = await axios.get(getUrl(`/api/news-tags`))
            setNewsTags(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    // Функция добавления нового тега в параметры поиска
    const addNewsTags = (tag) => {
        if (!tags.get('tags')) setTags({ tags: tag })
        else setTags({ tags: `${tags.get('tags')},${tag}` })
    }

    // Функция удаления тега из параметров поиска
    const deleteNewsTags = (tag) => {
        if (tags.get('tags').split(',').length > 1) setTags({ tags: `${tags.get('tags').split(',').filter(e => e !== tag).toString()}` })
        else setTags({})
    }

    // Функция фильтрации списка тегов
    const tagsFilter = useMemo(() => {
        {
            if (searchTagsTerm.length > 0) {
                return newsTags
                    .filter(e => (
                        tags?.get('tags')?.split(',').find(filter => e?.title === filter) === undefined) || (!tags?.get('tags')
                        ))
                    .filter(e => e.title.includes(searchTagsTerm))
                    .map(e =>
                        <div
                            onClick={() => addNewsTags(e?.title)}
                            key={e?.documentId}
                        >
                            {e?.title}
                        </div>
                    )
            }
            else {
                return newsTags
                    .filter(e => (
                        tags?.get('tags')?.split(',').find(filter => e?.title === filter) === undefined) || (!tags?.get('tags')
                        ))
                    .map(e =>
                        <div
                            onClick={() => addNewsTags(e?.title)}
                            key={e?.documentId}
                        >
                            {e?.title}
                        </div>
                    )
            }
        }
    }, [searchTagsTerm, newsTags])

    // Запрашиваем новости и теги при изменении текущей страницы, языка, выбранных тегов
    useEffect(() => {
        fetchNews()
        fetchNewsTags()
    }, [page, language, tags])

    // Ищем новости по ключевым словам в названии
    useEffect(() => {
        if (timer) clearTimeout(timer)

        if (searchNewsTerm && (searchNewsTerm.length > 0)) {
            const newTimer = setTimeout(() => {
                fetchNews()
            }, 2000)
            setTimer(newTimer)
        }

        if (!searchNewsTerm) fetchNews()

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [searchNewsTerm])

    // Ищем новости по выбранной дате
    useEffect(() => {
        if (timer) clearTimeout(timer)

        if (searchNewsDate) {
            const newTimer = setTimeout(() => {
                fetchNews()
            }, 2000)
            setTimer(newTimer)
        }

        if (!searchNewsDate) fetchNews()

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [searchNewsDate])

    return (
        <div>
            <Section className={styles.section_search}>
                <div className={styles.search}>
                    <div className={styles.select_tags}>
                        <div className={styles.search_input}>
                            {tags.get('tags')?.length > 0 && tags.get('tags').split(',').map(tag => <div className={styles.tag} key={tag}>{tag} <RemoveCircleOutlineIcon onClick={() => deleteNewsTags(tag)} /></div>)}
                            <input value={searchTagsTerm} onChange={e => setSearchTagsTerm(e.target.value)} placeholder="Выберите направление" type="text" onFocus={() => setIsTagsOptionOpen(true)} onBlur={() => setIsTagsOptionOpen(false)} />
                        </div>
                        <div className={isTagsOptionOpen ? `${styles.tags_options} ${styles.open}` : styles.tags_options}>
                            {tagsFilter}
                        </div>
                    </div>
                    <div className={styles.search_input}>
                        <input type="text" placeholder="Введите фразу для поиска" value={searchNewsTerm} onChange={e => setSearchNewsTerm(e.target.value)} />
                    </div>
                    <div className={styles.search_input}>
                        <input type="date" placeholder="Выберите дату" value={searchNewsDate} onChange={e => setSearchNewsDate(e.target.value)} />
                    </div>
                </div>
            </Section>
            <Section title={t('news')}>
                <MosaicGrid>
                    {news.map((e, i) =>
                        <Card
                            key={e.documentId}
                            type="news"
                            imageUrl={`${process.env.PUBLIC_BACKEND_URL}${e.picture.url}`}
                            linkHref={`/news/${e.documentId}`}
                            title={e.name}
                            topOnClick={true}
                        />
                    )}
                </MosaicGrid>
            </Section>
            <Pagination
                pageCount={pageCount}
                page={page}
                setPage={setPage}
            />
        </div>
    )
}