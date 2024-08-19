import { useEffect, useRef, useState } from 'react';
import './carousel.css';


export const Carousel = ({ images }) => {
  const containerRef = useRef(null); // Optional, use for re-size process

  const [currIndex, setCurrIndex] = useState(0); //!Required state
  const [imageWidth, setImageWidth] = useState(null); //Optional（因为简易版的CarouselI就是写死的），可以理解为viewPort宽度
  const [isTransitioning, setIsTransitioning] = useState(false); //Optional, 主要目的是控制是否在特定情况下添加或移除css动画类，从而精细地控制过渡动画的触发时机

  const goPrev = () => updateCurrIndex(currIndex - 1);
  const goNext = () => updateCurrIndex(currIndex + 1);
  const goSpecific = (idx) =>  updateCurrIndex(idx);

  const stopTransition = () => setIsTransitioning(false);
  const updateImageWidth =() => setImageWidth(containerRef.current?.getBoundingClientRect()?.width ?? 0);
  const updateCurrIndex = (newIndex) => {
    setIsTransitioning(true);
    setCurrIndex((newIndex + images.length) % images.length); // <- modulo operation
  }

  useEffect(() => {
    updateImageWidth();
    window.addEventListener('resize', updateImageWidth);
    return () => {
      window.removeEventListener('resize', updateImageWidth);
    };
  }, []);

  return (
      <div className="image-carousel-container" ref={containerRef}>
        <div
          onTransitionEnd={stopTransition}
          className={classNames('images-container', isTransitioning && 'images-container--transitioning')}
          //!重点在这里：transfrom:translateX(-多少px) ---> 用来向左平移
          style={{ transform: imageWidth ? `translateX(-${currIndex * imageWidth}px)` : undefined }}
        >
          {images.map(({ alt, src }) => (
            <img
              alt={alt}
              src={src}
              key={src}
              className='single-image'
            />
          ))}
        </div>

        <button
          className="carousel-button prevBtn"
          onClick={goPrev}
          aria-label="Previous image"
          disabled={isTransitioning}
        >
          Prev
        </button>
        <button
          className="carousel-button nextBtn"
          onClick={goNext}
          aria-label="Next image"
          disabled={isTransitioning}
        >
          Next
        </button>

        <div className="pages-container">
          {images.map(({ alt, src }, index) => (
            <button
              key={src}
              className={classNames('dot', index === currIndex && 'dot-active')}
              onClick={() => {goSpecific(index)}}
              aria-label={`Navigate to ${alt}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
  );
}

// helper function:
const classNames = (...args) => args.filter(Boolean).join(' ')