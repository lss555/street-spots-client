import React, { useState } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'
import stubai2 from '../shared/stubai2.jpg'
import beartooth from '../shared/beartooth.jpg'
import gorgeroad from '../shared/gorgeroad.jpg'
import barnum from '../shared/barnum.jpg'
import './Home.css'

const items = [
  {
    src: gorgeroad,
    altText: 'Gorge road dirtjumps',
    caption: 'New Zealand',
    header: 'Gorge road dirtjumps'
  },
  {
    src: stubai2,
    altText: 'Stubai Zoo',
    caption: 'Austria',
    header: 'Stubai Zoo'
  },
  {
    src: beartooth,
    altText: 'Beartooth Basin',
    caption: 'Read Lodge Montana',
    header: 'Beartooth Basin'
  },
  {
    src: barnum,
    altText: 'Barnum dirt jumps',
    caption: 'Denver, CO',
    header: 'Barnum dirt jumps'
  }
]

const Home = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex) => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className='carousel'
      >
        <img className='p-image' src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.header} />
      </CarouselItem>
    )
  })

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  )
}

export default Home
