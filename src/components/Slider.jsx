import React, { useEffect, useState, useRef } from "react";
import "../styles/Slider.css"

export default function Slider({ arrows = false, dots = false, autoPlay = false, autoPlayTime = 3000, slides = [] }) {

    const [slideNumber, setSlideNumber] = useState(0);
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [swipe, setSwipe] = useState(false)
    const sliderRef = useRef(null)
    console.log(touchStart, touchEnd)



    const minSwipeDistance = 150;

    const onMouseStart = (event) => {
        setTouchEnd(0)
        setSwipe(true)
        setTouchStart(event.clientX)
    }

    const onMouseMove = (event) => {
        setTouchEnd(event.clientX)
    }

    const onMouseEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distanse = touchStart - touchEnd
        const isLeftSwipe = distanse > minSwipeDistance
        const isRightSwipe = distanse < -minSwipeDistance
        if (isLeftSwipe) {
            setSlideNumber(e => (e < slides.length - 1 ? e + 1 : 0))
        }
        if (isRightSwipe) {
            setSlideNumber(e => (e > 0 ? e - 1 : slides.length - 1));
        }
        setTouchStart(0);
        setTouchEnd(0);
        setSwipe(false)
    }

    const onTouchStart = (event) => {
        setTouchEnd(0)
        setSwipe(true)
        setTouchStart(event.targetTouches[0].clientX)
    }

    const onTouchMove = (event) => {
        setTouchEnd(event.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distanse = touchStart - touchEnd
        const isLeftSwipe = distanse > minSwipeDistance
        const isRightSwipe = distanse < minSwipeDistance
        if (isLeftSwipe) {
            setSlideNumber(e => (e < slides.length - 1 ? e + 1 : 0))
        }
        if (isRightSwipe) {
            setSlideNumber(e => (e > 0 ? e - 1 : slides.length - 1));
        }
        setTouchStart(0);
        setTouchEnd(0);
        setSwipe(false)
    }

    if ((slideNumber > slides.length - 1) && slides.length) {
        setSlideNumber(0)
    }

    useEffect(() => {
        if (autoPlay) {
            const autoPlayInterval = setInterval(() => {
                setSlideNumber(e => e + 1)
            }, autoPlayTime)
            return () => {
                clearInterval(autoPlayInterval)
            }
        }
    }, [slides.length])

    if (!slides.length) {
        return (
            <div className="slider_container">
                <div className="slides">
                    <div className="slide active">
                        <img src="./media/6.jpg" alt="Loading..." />
                    </div>
                </div>
            </div>
        );
    }

    const slideClassName = (slideIndex, slideNumber) => {
        if (slideIndex === slideNumber) {
            return "slide-swiper-active"
        }
        if ((slideIndex === slideNumber + 1) && (slideNumber < slides.length)) {
            return "slide-swiper-next"
        }
        if ((slideIndex === slideNumber - 1) && (slideNumber > 0)) {
            return "slide-swiper-prev"
        }
        else {
            return "slide-swiper"
        }
    }
    // console.log(window.innerWidth);

    return (
        < div className="slider_container"
            ref={sliderRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseStart}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseEnd}
        >
            {arrows && <button className="prev_slide" onClick={() => slideNumber < 1 ? setSlideNumber(slides.length - 1) : setSlideNumber(e => e - 1)}>{"<"}</button>}
            {/* <div className="slides-swiper" >
                {slides && slides.map((e, index) => <div key={index} className={slideClassName(index, slideNumber)}>
                    <img src={`http://localhost:1337${e.main_page_slide_picture.url}`} loading="lazy" />
                </div>
                )}
            </div> */}
            <div className="slides" style={{ transform: `translate3d(-${swipe ? `${(slideNumber * window.innerWidth) + (touchStart - touchEnd)}px, 0, 0` : `${slideNumber * window.innerWidth}px, 0, 0`})`, transition: `${swipe ? `0` : `2.5`}`}}>
                {slides && slides.map((e, index) => <div key={index} className={index === slideNumber ? "slide active" : "slide"}>
                    <img src={`http://localhost:1337${e.main_page_slide_picture.url}`} loading="lazy" />
                </div>
                )}
            </div>
            {/* <div className="slides">
                {slides && slides.map((e, index) => <div key={index} className={index === slideNumber ? "slide active" : "slide"} style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}>
                    <img src={`http://localhost:1337${e.main_page_slide_picture.url}`} loading="lazy" />
                </div>
                )}
            </div> */}
            {arrows && <button className="next_slide" onClick={() => slideNumber < slides.length - 1 ? setSlideNumber(e => e + 1) : setSlideNumber(0)}>{">"}</button>}
            {dots &&
                <div className="dots">
                    {slides.map((e, i) => <div key={i} className={i === slideNumber ? "dot selected" : "dot"} onClick={() => setSlideNumber(i)}></div>)}
                </div>
            }
        </div >
    )
}