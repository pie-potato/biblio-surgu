import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import styles from '../styles/NewsPage.module.css'
import Section from "../components/Section";
import parse from 'html-react-parser'
import Button from "../components/Button";
import { useFetch } from "../hooks/useFetch";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

export default function NewsPage() {

    const [news, setNews] = useState([null])
    const [newsDate, setNewsDate] = useState(null)
    const [lastNews, setLastNews] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { id } = useParams()
    const {getUrl} = useFetch()    
    const {language} = useLanguage()
    const [t] = useTranslation()

    const fetchLastNews = async () => {
        try {
            const response = await axios.get(getUrl(`/api/news?sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=3&populate=picture`))
            setLastNews(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchNewsById = async () => {
        try {
            const response = await axios.get(getUrl(`/api/news/${id}?populate=picture`))
            setNews(response.data.data)
            setNewsDate(new Date(response.data.data.createdAt))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchNewsById()
        fetchLastNews()
    }, [id, language])

    return (
        <div className={styles.news_page}>
            <Section width={(windowWidth > 800) ? 75 : null} title={news?.name}>
                <div className={styles.main_news}>
                    <p className={styles.date}>
                        {newsDate?.getDate()}.{newsDate?.getMonth() + 1 < 10 && 0}{newsDate?.getMonth() + 1}.{newsDate?.getFullYear()}
                    </p>
                    <div className={styles.image_container}>
                        {news?.picture?.url
                            ? <img className={styles.news_image} src={`${process.env.PUBLIC_BACKEND_URL}${news?.picture?.url}`} alt={news?.name} loading="lazy" />
                            : <div className={styles.image_placeholder}></div>
                        }
                    </div>
                    <div className={styles.news_content}>
                        {news?.content && parse(news?.content)}
                    </div>
                </div>
            </Section>
            <Section title={t('last_news')}>
                <div className={styles.last_news}>
                    <div className={styles.last_news_container}>
                        {lastNews.map(e =>
                            <div className={styles.news_element} key={e?.documentId}>
                                <Link to={`/news/${e?.documentId}`} className={styles.news_link} onClick={() => window.scrollTo(0, 0)}>
                                    {e?.picture?.url
                                        ? <img className={styles.news_picture} src={`${process.env.PUBLIC_BACKEND_URL}${e?.picture?.url}`} alt={e?.name} loading="lazy" />
                                        : <div className={styles.news_picture_placeholder}></div>
                                    }
                                    <div className={styles.news_name}>{e?.name}</div>
                                </Link>
                            </div>
                        )}
                        <Button href="/news" variant="secondary" onClick={() => window.scrollTo(0, 0)}>{t('all_news')}</Button>
                    </div>
                </div>
            </Section>
        </div>
    )
}