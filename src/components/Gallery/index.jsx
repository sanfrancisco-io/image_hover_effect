import React, { useContext, useEffect, useRef, useState } from 'react';
import { images } from '../../data';
import cn from 'classnames';
import './style.scss';
import { CursorContext } from '../../Custom/CursorManager';

function GalleryItem({ src }) {
  const ref = useRef(null);
  const mouseContext = useContext(CursorContext);

  const [clipMaskRadius, setClipMaskRadius] = useState(25);
  const [clipMask, setClipMask] = useState({ x: 0, y: 0 });
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReveal(true);
    }, 1000);
  }, []);

  useEffect(() => {
    function getCoordinates(mouse) {
      const imagePosition = {
        posX: ref.current.offsetLeft,
        posY: ref.current.offsetTop,
      };

      const posX = mouse.pageX - imagePosition.posX;
      const posY = mouse.pageY - imagePosition.posY;

      setClipMask({
        x: (posX / ref.current.clientWidth) * 100,
        y: (posY / ref.current.clientHeight) * 100,
      });
    }

    ref.current.addEventListener('mousemove', (mouse) => {
      window.requestAnimationFrame(() => {
        getCoordinates(mouse);
      });
    });
  }, []);
  return (
    <div
      className={cn('gallery-item-wrapper', { 'is-reveal': reveal })}
      ref={ref}
      onMouseEnter={() => {
        setClipMaskRadius(25);
        mouseContext.setSize('hide');
      }}
      onMouseLeave={() => {
        setClipMaskRadius(0);
        mouseContext.setSize('small');
      }}
    >
      <div className='gallery-item'>
        <div
          className='gallery-item-image sepia'
          style={{ backgroundImage: `url(${src})` }}
        />
        <div
          className='gallery-item-image masked'
          style={{
            backgroundImage: `url(${src})`,
            clipPath: `circle(${clipMaskRadius}% at ${clipMask.x}% ${clipMask.y}%)`,
          }}
        />
      </div>
    </div>
  );
}

const Gallery = () => {
  return (
    <div className='gallery'>
      {images.map((item) => (
        <GalleryItem key={item} src={item} />
      ))}
    </div>
  );
};

export default Gallery;
