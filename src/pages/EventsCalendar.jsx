import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ru from '@fullcalendar/core/locales/ru';

export default function EventsCalendar() {

    const { getUrl } = useFetch()
    const { language } = useLanguage()
    const [t] = useTranslation()

    return (
        <div>
            {/* <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale={ru}
                events={events.map(e => {
                    return {
                        id: e.id,
                        title: e.title,
                        start: e.event_time
                    }
                })}
            /> */}
        </div>
    )
}