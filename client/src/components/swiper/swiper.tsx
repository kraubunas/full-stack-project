/* eslint-disable no-console */
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, Pagination, Scrollbar, A11y, Autoplay,
} from 'swiper';
import image from '../../assets/image.jpg';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';

const Image: React.FC = () => (
  <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} src={image} alt="nature" />
);
const Image1: React.FC = () => (
  <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} src={image1} alt="nature" />
);
const Image2: React.FC = () => (
  <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} src={image2} alt="nature" />
);
const Image3: React.FC = () => (
  <img style={{ width: '100%', height: '400px', objectFit: 'cover' }} src={image3} alt="nature" />
);

const SwiperComponent: React.FC = () => (
  <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    spaceBetween={50}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    height={300}
    autoplay={
      { delay: 10000 }
    }
  >
    <SwiperSlide>{Image}</SwiperSlide>
    <SwiperSlide>{Image1}</SwiperSlide>
    <SwiperSlide>{Image2}</SwiperSlide>
    <SwiperSlide>{Image3}</SwiperSlide>
  </Swiper>
);

export default SwiperComponent;
