import { useTranslation } from "react-i18next"
import "../styles/Footer.css"
import { Link } from "react-router"
import { useState, useEffect } from "react"
import axios from "axios"
import { useFetch } from "../hooks/useFetch";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {

    const [t] = useTranslation()

    const [footertags, setFooterTags] = useState([])
    const { getUrl } = useFetch()
    const { language } = useLanguage()

    const fetchFooterTags = async () => {
        try {
            const find = await axios.get(getUrl(`/api/find?populate[page][fields][0]=name&populate[page][fields][1]=slug`))
            const becomeReader = await axios.get(getUrl(`/api/become-reader?populate[page][fields][0]=name&populate[page][fields][1]=slug`))
            const kontakty = await axios.get(getUrl(`/api/kontakty?populate[page][fields][0]=name&populate[page][fields][1]=slug`))
            setFooterTags([find.data.data, becomeReader.data.data, kontakty.data.data])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchFooterTags()
    }, [language])

    return (
        <footer className="footer">
            <div>
                <h3>{t('reader')}</h3>
                <ul className="footer_list">
                    {footertags.map(e => <li key={e.documentId}><Link to={`/pages/${e?.page?.slug}`} onClick={() => {window.scrollTo(0, 0)}}>{e?.title}</Link></li>)}
                </ul>
            </div>
            <div>
                <h3>{t('social_network')}</h3>
                <ul className="footer_list">
                    <li><Link to="https://vk.com/libsurgu">ВКонтакте</Link></li>
                </ul>
            </div>
            <div>
                <div>
                    © 2025 <br />
                    {t('address')}<br />
                    Тел.: +7 (3462)76-28-11
                </div>
                <ul className="footer_list">
                    <li><Link to="mailto:lib@surgu.ru">{t('write_us')}</Link></li>
                    <li><Link href="http://www.surgu.ru">{t('surgu')}</Link></li>
                </ul>
            </div>
        </footer>
    )
}