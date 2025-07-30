import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import parse, { domToReact } from 'html-react-parser'
import '../styles/SelectionsPage.css'
import Section from "../components/Section";
import { useFetch } from "../hooks/useFetch";
import Button from "../components/Button";
import { useLanguage } from "../context/LanguageContext";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router";
export default function SelectionsPage() {

    let pageId = useParams().page
    const [pageData, setPageData] = useState({})
    const { getUrl } = useFetch()
    const { language } = useLanguage()

    const fetchPageData = async () => {
        try {
            const response = await axios.get(getUrl(`/api/pages?filters[slug][$eq]=${pageId}&populate[children][sort][0]=createdAt:asc&populate[children][fields][0]=name&populate[children][fields][1]=slug`))
            setPageData(response.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPageData()
    }, [pageId, language])

    const options = {
        replace: (domNode) => {
            if (domNode.attribs?.href?.startsWith('http')) {
                return <a href={domNode.attribs.href} target="_blank" rel="noopener noreferrer">{domToReact(domNode.children, options)}</a>;
            }
            if (domNode.name === 'a' && domNode.attribs.href) {
                return (
                    <Link to={domNode.attribs.href}>
                        {domToReact(domNode.children, options)}
                    </Link>
                );
            }
        },
    };

    return (
        <div className="selection_page">
            <Breadcrumbs aria-label="breadcrumb" className="subpages">
                {pageData?.children?.map(e =>
                    <Link key={e.id} className="subpage" to={`/pages/${e.slug}`}>{e.name}</Link>
                )}
            </Breadcrumbs>
            <Section className="page_content" title={pageData.name}>
                {pageData?.page_content && parse(pageData?.page_content, options)}
            </Section>
        </div>
    )
}