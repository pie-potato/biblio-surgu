import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Link } from "react-router";
import styles from "../styles/Main.module.css"
import 'swiper/css/pagination';
import Section from "../components/Section";
import MosaicGrid from "../components/MosaicGrid";
import Card from "../components/Card";
import Button from "../components/Button";
import { useLanguage } from "../context/LanguageContext";
import { useFetch } from "../hooks/useFetch";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import StorageIcon from '@mui/icons-material/Storage';
import BiotechIcon from '@mui/icons-material/Biotech';
import NewspaperIcon from '@mui/icons-material/Newspaper';

export default function Main() {

    const [slides, setSlides] = useState([])
    const [news, setNews] = useState([])
    const [events, setEvents] = useState([])
    const [newsTags, setNewsTags] = useState([]);
    const [query, setQuery] = useState()
    const { language } = useLanguage()
    const { getUrl } = useFetch()
    const [t] = useTranslation()

    const fetchSlideMainPage = async () => {
        try {
            const response = await axios.get(getUrl(`/api/news?populate=picture&filters[content_tag][content_tag][$containsi]=Слайд на главной странице`))
            setSlides(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchEvents = async () => {
        try {
            const response = await axios.get(getUrl(`/api/events?sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=4&populate[event_place][fields][0]=name&populate=picture`))
            setEvents(response?.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchNews = async () => {
        try {
            const response = await axios.get(getUrl(`/api/news?sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=4&populate=picture`))
            setNews(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchNewsTags = async () => {
        try {
            const response = await axios.get(getUrl(`/api/news-tags`))
            setNewsTags(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchSlideMainPage()
        fetchEvents()
        fetchNews()
        fetchNewsTags()
    }, [language])

    return (
        <div className={styles.main_page}>
            <Swiper
                autoplay={true}
                modules={[EffectFade, Autoplay, Pagination]}
                loop={true}
                pagination={true}
            >
                {slides.map(slide =>
                    <SwiperSlide
                        key={slide.documentId}
                    >
                        <Link to={`/news/${slide.documentId}`} onClick={() => { window.scrollTo(0, 0) }}>
                            <img src={`${process.env.PUBLIC_BACKEND_URL}${slide.picture?.formats?.large?.url || slide.picture.url}`} loading="lazy" style={{ aspectRatio: "16 / 9" }} width="100%" />
                        </Link>
                    </SwiperSlide>
                )}
            </Swiper>
            <Section >
                <div className={styles.section_search}>
                    <input
                        className={styles.search_input}
                        placeholder={t('search_placeholder')}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.currentTarget.value)}
                        onKeyDown={e => { if (e.key === "Enter") window.open(`https://rusneo.surgu.ru/pwb/?cq=cql.allIndexes%20all%20"${query}"`, '_blank') }}
                    />
                    <Button variant="secondary" onClick={() => window.open(`https://rusneo.surgu.ru/pwb/?cq=cql.allIndexes%20all%20"${query}"`, '_blank')}><SearchIcon fontSize="large" /></Button>
                </div>
                <div className={styles.basic_info}>
                    <Link to="https://elib.surgu.ru/" target="_blank">
                        <div className={styles.basic_info_card}>
                            <CollectionsBookmarkIcon fontSize="large" />
                            <div>{t('elib')}</div>
                        </div>
                    </Link>
                    <Link to="/pages/elektronno-bibliotechnye-sistemy">
                        <div className={styles.basic_info_card}>
                            <LaptopChromebookIcon fontSize="large" />
                            <div>{t('elib_system')}</div>
                        </div>
                    </Link>
                    <Link to="/pages/nauchnye-bazy-dannyh">
                        <div className={styles.basic_info_card}>
                            <StorageIcon fontSize="large" />
                            <div>{t('databases')}</div>
                        </div>
                    </Link>
                    <Link to="https://portalsurgu.elpub.ru/" target="_blank">
                        <div className={styles.basic_info_card}>
                            <BiotechIcon fontSize="large" />
                            <div>{t('science_journals')}</div>
                        </div>
                    </Link>
                    <Link to="/pages/periodicheskie-izdaniya">
                        <div className={styles.basic_info_card}>
                            <NewspaperIcon fontSize="large" />
                            <div>{t('periodic')}</div>
                        </div>
                    </Link>
                </div>
            </Section>
            <Section title={t('news')}>
                <div className={styles.button_group}>
                    {newsTags.map(e => <Button href={`/news?tags=${e.title}`} key={e.documentId}>{e.title}</Button>)}
                </div>
                {window.innerWidth <= 1024 && <img src="/media/present.svg" alt="Листай новости" />}
                <div className={styles.news}>
                    <MosaicGrid className={styles.news_container}>
                        {news.map((e, i) =>
                            <Card
                                key={e.id}
                                type="news"
                                imageUrl={`${process.env.PUBLIC_BACKEND_URL}${e.picture.url}`}
                                title={e.name}
                                linkHref={`/news/${e.documentId}`}
                                className={styles.news_element}
                                topOnClick={true}
                            />
                        )}
                        <Button href="/news" variant="secondary" onClick={() => { window.scrollTo(0, 0) }}>{t('all_news')}</Button>
                    </MosaicGrid>
                </div>
            </Section>
            <Section title={t('events')}>
                {window.innerWidth <= 1024 && <img src="/media/present.svg" alt="Листай мероприятия" />}
                <div className={styles.event}>
                    <MosaicGrid className={styles.event_container}>
                        {events.map((e, i) =>
                            <Card
                                key={e.id}
                                type="event"
                                location={e?.event_place?.name}
                                title={e.title}
                                linkHref={`/event/${e.documentId}`}
                                className={styles.event_element}
                                topOnClick={true}
                                imageUrl={e?.picture && `${process.env.PUBLIC_BACKEND_URL}${e?.picture?.url}`}
                            />
                        )}
                        <Button href="/events" variant="secondary" onClick={() => { window.scrollTo(0, 0) }}>{t('all_events')}</Button>
                    </MosaicGrid>
                </div>
            </Section>

        </div>
    )
}