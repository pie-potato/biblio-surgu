import axios from "axios"
import { useEffect, useState } from "react"
import Section from "../components/Section"
import MosaicGrid from "../components/MosaicGrid"
import Card from "../components/Card"
import Pagination from "../components/Pagination"
import { useFetch } from "../hooks/useFetch";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

export default function Events() {

    const [events, setEvents] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const {getUrl} = useFetch()    
    const {language} = useLanguage()
    const [t] = useTranslation()
console.log(events);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(getUrl(`/api/events?sort[0]=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=10&populate[event_place][fields][0]=name&populate=picture`))
            setEvents(response?.data.data)
            if (pageCount !== response.data.meta.pagination.pageCount) {
                setPageCount(response.data.meta.pagination.pageCount)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [page, language])

    return (
        <div>
            <Section title={t('events')}>
                <MosaicGrid>
                    {events.map((e, i) =>
                        <Card
                            key={e.documentId}
                            type="event"
                            location={e?.event_place?.name}
                            topOnClick={true}
                            // imageUrl={`http://${window.location.hostname}:1337${e.news_picture.url}`}
                            linkHref={`/event/${e.documentId}`}
                            title={e.title}
                            // imageType={(i % 6) === 0 ? "fullHeight" : ""}
                            gridClasses="gridItemW1 gridItemH1"
                            imageUrl={e?.picture && `${process.env.PUBLIC_BACKEND_URL}${e?.picture?.url}`}
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