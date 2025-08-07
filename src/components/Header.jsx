import { useState, useEffect } from "react";
import "../styles/Header.css";
import { Link, useLocation } from "react-router";
import axios from "axios";
import { useFetch } from "../hooks/useFetch";
import { useLanguage } from "../context/LanguageContext";
import Button from "./Button";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import MenuElement from "./MenuElement";

export default function Header() {
    const [selections, setSelections] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [submenuOpen, setSubmenuOpen] = useState(null)
    const [navigation, setNavigation] = useState([])
    const { language, setLanguage } = useLanguage()
    const location = useLocation().pathname
    const { getUrl } = useFetch()

    const fetchSelections = async () => {
        try {
            const response = await axios.get(getUrl(`/api/sections/deep-nested`));
            setSelections(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSelections();
    }, [language])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 820 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const renderSubMenu = (pages, selectionId) => {
        return (
            <>
                <ul className={submenuOpen === selectionId ? "navbar_link_submenu open" : "navbar_link_submenu"}>
                    {pages.map(page =>
                        <li key={page.documentId} className="submenu_link">
                            <div className="mobile_link">
                                <Link to={`/pages/${page.slug}`} onClick={() => setIsMobileMenuOpen(false)}>{page.name} </Link>
                                {page.children.length > 0 && <KeyboardDoubleArrowRightIcon className="svg_arrow" />}
                            </div>
                            {page.children.length > 0 &&
                                renderSubMenu(page.children, page.documentId)}
                        </li>
                    )}
                </ul>
            </>
        )

    }

    return (
        <header className={((location === "/") && (window.innerWidth >= 1000)) ? "header absolute" : "header"}>
            <div className={isMobileMenuOpen ? "header_top open" : "header_top"}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/media/logo1.png" className="logo" alt="Logo" loading="lazy"/>
                </Link>

                {windowWidth <= 1510 ? (
                    <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
                    </button>
                ) : (
                    <div className="header_navbar">
                        {selections.map(e => (
                            <div key={e.documentId} className={location === "/" ? "header_navbar_element absolute" : "header_navbar_element"} tabIndex={0}>
                                <div className="navbar_link">{e.title} <KeyboardDoubleArrowRightIcon /></div>
                                <div className="menu" tabIndex={0}>
                                    <MenuElement pages={e.page} selectionId={null} selectionName={e.title} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="header_navbar">
                    <div className={location === "/" ? "language_choice absolute" : "language_choice"}>
                        <div className="navbar_link">Язык/Language</div>
                        <ul className="languages">
                            <li className="language">
                                <Link onClick={() => setLanguage('ru')}>Русский</Link>
                            </li>
                            <li className="language">
                                <Link onClick={() => setLanguage('en')}>English</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                windowWidth <= 1510 &&
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    {selections.map(e => (
                        <div key={e.id} className={"mobile-navbar-element"}>
                            <div className="navbar_link" >{e.title} <KeyboardDoubleArrowRightIcon /></div>
                            <ul className="mobile-submenu">
                                {renderSubMenu(e.page, null)}
                            </ul>
                        </div>
                    ))}
                    <div className="mobile-navbar-element">
                        <div className="navbar_link">Язык/Language <img src="/media/arrow.svg" /></div>
                        <ul className="mobile-submenu">
                            <li className="submenu_link">
                                <Link onClick={() => {
                                    setLanguage('ru')
                                    setIsMobileMenuOpen(false)
                                }}>Русский</Link>
                            </li>
                            <li className="submenu_link">
                                <Link onClick={() => {
                                    setLanguage('en')
                                    setIsMobileMenuOpen(false)
                                }}>English</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </header >
    )
};