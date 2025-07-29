import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Локализованные тексты для каждого языка
const resources = {
    en: {
        translation: {
            "important_information": "Important information",
            "news": "News",
            "events": "Events",
            "all_news": "All news",
            "all_events": "All events",
            "last_news": "Last news",
            "last_events": "Last events",
            "reader": "For readers",
            "social_network": "Our social media",
            "find_we": "How to find us",
            "become_reader": "How to become a reader",
            "contacts": "Contacts",
            "address": "Lenin pr., 1, Surgut, Tyumen region, 628412",
            "write_us": "Write to us!",
            "surgu": "SurGU",
            "more": "More detailed",
            "place": "Place",
            "search_placeholder": "Catalog search",
            "search": "Search",
            "elib": "Electronic library of SurGU",
            "elib_system": "Electronic library system",
            "databases": "Databases",
            "science_journals": "Scientific journals SurGU",
            "periodic": "Periodicals",
            "VKR": "Placement FQW",
            "info_about_work": 'Job Information',
            "name_diplom": 'Job name',
            "type_diplom": 'Type of work',
            "diplom": 'Diploma',
            "bachelor": 'Bachelor',
            "master": 'Master',
            "graduate_student": "Graduate student",
            "referral_code": "Referral code",
            "referral_name": "Name of the destination",
            "files_fqw": "Files FQW",
            "fullname_author": "Fullname author",
            "fullname_scientific_supervisor": "Fullname scientific supervisor",
            "institute": "Institute",
            "submit": "Submit"
        }
    },
    ru: {
        translation: {
            "important_information": "Важная информация",
            "news": "Новости",
            "events": "Мероприятия",
            "all_news": "Все новости",
            "all_events": "Все мероприятия",
            "last_news": "Последние новости",
            "last_events": "Последние мероприятия",
            "reader": "Читателям",
            "social_network": "Мы в соцсетях",
            "find_we": "Как нас найти",
            "become_reader": "Как стать читателем",
            "contacts": "Контакты",
            "address": "пр. Ленина, 1, г. Сургут, Тюменская обл., 628412",
            "write_us": "Напишите нам!",
            "surgu": "СурГУ",
            "more": "Подробнее",
            "place": "Место",
            "search_placeholder": "Поиск по катологу",
            "search": "Поиск",
            "elib": "Электронная библиотека СурГУ",
            "elib_system": "Электронно-библиотечные системы",
            "databases": "Базы данных",
            "science_journals": "Научные журналы СурГУ",
            "periodic": "Переодические издания",
            "VKR": "Размещение ВКР",
            "info_about_work": 'Информация о работе',
            "name_diplom": 'Название работы',
            "type_diplom": 'Тип работы',
            "diplom": 'Диплом',
            "bachelor": 'Бакалавр',
            "master": 'Магистр',
            "graduate_student": "Аспирант",
            "referral_code": "Код направления",
            "referral_name": "Название направления",
            "files_fqw": "Файлы ВКР",
            "fullname_author": "ФИО автора",
            "fullname_scientific_supervisor": "ФИО научного руководителя",
            "institute": "Институт",
            "submit": "Отправить"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || 'ru', // Язык из localStorage
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false // Не экранировать HTML (если нужно)
        }
    });

export default i18n;