import { useLanguage } from "../context/LanguageContext"

// const language = localStorage.getItem('language') || 'ru'

export const useFetch = () => {
    const { language } = useLanguage()
    
    const getUrl = (url = "") => {
        return `${process.env.PUBLIC_BACKEND_URL}${url}${url.includes('?') ? `&locale=${language}` : `?locale=${language}`}`
    }

    return { getUrl }
}