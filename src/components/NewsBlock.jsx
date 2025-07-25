import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/NewsBlock.css'
import { Link } from "react-router";
import Button from "./Button";

const fetchNews = async (setNews) => {
    try {
        const response = await axios.get('http://localhost:1337/api/news?sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=4&populate=news_picture')
        setNews(response.data.data)
    } catch (error) {
        console.error(error)
    }
}

export default function NewsBlock() {

    const [news, setNews] = useState(null)
    console.log(news);

    useEffect(() => {
        fetchNews(setNews)
    }, [])



    return (
        <div>
            <Button><Link to="/news" >Все новости</Link></Button>
            {/* <div className="all_news"></div> */}
            <div className="news">
                {news && news.map(e =>
                    <div className="news_element" key={e.documentId}>
                        <Link to={`/news/${e.documentId}`} className="news_link">
                            <img className="news_picture" src={`http://localhost:1337${e.news_picture.url}`} width='100%' height={170} loading="lazy" />
                            <div className="news_name">{e.news_name}</div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}