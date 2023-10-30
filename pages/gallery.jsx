import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

export default function Gallery() {
  const [images, setImages] = useState([]);
  // In your Gallery component
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos', {
          params: {
            client_id: '-yfACx8su3KHiy8shB9S6sbnS4d_ztFq19FKhpsh_pc',
            per_page: 30,
          },
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching the images', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='bg-gray-100'>
        <div className='grid grid-cols-4 gap-2 p-4'>
          {images.map((image) => (
            <img
              loading='lazy'
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              className='rounded shadow-lg'
            />
          ))}
        </div>
    
        {/* 
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image.id}>
              <img loading="lazy" src={image.urls.small} alt={image.alt_description} />
            </div>
          ))}
        </Slider> */}
      </div>
    </>
  );
}
