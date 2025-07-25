import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import styles from '../styles/Event.module.css'
import Section from "../components/Section";
import parse from 'html-react-parser'
import { useFetch } from "../hooks/useFetch";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";

export default function Event() {
    const [event, setEvent] = useState([])
    const [eventDate, setEventDate] = useState(null)
    const [lastEvents, setLastEvents] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { id } = useParams()
    const {getUrl} = useFetch()    
    const {language} = useLanguage()
    const [t] = useTranslation()

    const fetchEventById = async () => {
        try {
            const response = await axios.get(getUrl(`/api/events/${id}?populate=picture`))
            setEvent(response.data.data)
            setEventDate(new Date(response.data.data.event_start))
        } catch (error) {
            console.error(error)
        }
    }

    const fetchEvents = async () => {
        try {
            const response = await axios.get(getUrl(`/api/events?sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=3&populate[event_place][fields][0]=name&populate=picture`))
            setLastEvents(response?.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchEventById()
        fetchEvents()
    }, [id, language])

    return (
        <div className={styles.event_page}>
            <Section width={(windowWidth > 769) ? 75 : null} title={event?.title}>
                <div className={styles.main_event}>
                    {event.event_start && <p>{eventDate?.getDate()}.{eventDate?.getMonth() + 1 < 10 && 0}{eventDate?.getMonth() + 1}.{eventDate?.getFullYear()}</p>}
                    <div className={styles.image_container}>
                        {event?.picture?.url && <img className={styles.event_image} src={`${process.env.PUBLIC_BACKEND_URL}${event?.picture?.url}`} alt={event?.title} loading="lazy" />
                        }
                    </div>
                    <div className={styles.event_content}>
                        {event?.content && parse(event?.content)}
                    </div>
                </div>
            </Section>
            <Section title={t('last_events')}>
                <div className={styles.last_events}>
                    <div className={styles.last_events_container}>
                        {lastEvents.map(e =>
                            <div className={styles.event_element} key={e?.documentId}>
                                <Link to={`/event/${e?.documentId}`} className={styles.event_link}>
                                    {e?.picture?.url
                                        ? <img className={styles.event_picture} src={`${process.env.PUBLIC_BACKEND_URL}${e?.picture?.url}`} alt={e?.title} loading="lazy" />
                                        : <div className={styles.event_picture_placeholder}></div>
                                    }
                                    <div className={styles.event_name}>{e?.title}</div>
                                </Link>
                            </div>
                        )}
                        <Button href="/events" variant="secondary">{t('all_events')}</Button>
                    </div>
                </div>
            </Section>
        </div>
    )
}