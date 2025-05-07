import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom'; // Add this import
import homeComfortImg from '../../assets/webstore-frontend-banner1.png';
import EntertainHubImg from '../../assets/webstore-frontend-banner2.png';
import PlayfulPicksImg from '../../assets/webstore-frontend-banner3.png';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

const HeroBanner = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const bannerList = [
    {
      id: 1,
      title: "Fresh Fashion Finds",
      subtitle: "Trending Styles",
      description: "Explore the latest in fashion with bold designs, vibrant colors, and seasonal must-haves that let your personality shine.",
      image: homeComfortImg,
      link: "/products?category=Fashion" // Changed to relative path
    },
    {
      id: 2,
      title: "Entertainment Hub",
      subtitle: "Smart TV",
      description: "Experience the latest in home entertainment with cutting-edge technology, immersive visuals, and advanced sound quality.",
      image: EntertainHubImg,
      link: "/products?category=Electronics" // Changed to relative path
    },
    {
      id: 3,
      title: "Cozy Living Essentials",
      subtitle: "Modern Furniture",
      description: "Transform your space with modern, functional furniture designed for comfort, style, and everyday living.",
      image: PlayfulPicksImg,
      link: "/products?category=Furniture" // Changed to relative path
    },
  ];

  const handleShopNow = (link) => {
    navigate(link); // Use navigate instead of window.location
  };

  return (
    <div className="py-2 rounded-md overflow-hidden">
      <Swiper
        style={{
          '--swiper-navigation-color': 'white',
          '--swiper-pagination-color': 'white',
        }}
        grabCursor={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="slide"
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        slidesPerView={1}
        loop
        className="mySwiper rounded"
      >
        {bannerList.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="relative rounded-md sm:h-[500px] h-96 w-full"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'grab',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center sm:justify-start px-4 sm:px-10 md:px-20">
                <div className="text-center sm:text-left max-w-2xl pr-6 md:pr-12">
                  <span className="text-lg text-white font-semibold mb-2 block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-5xl text-white font-bold mb-4">
                    {item.title}
                  </h3>
                  <p className="text-md text-white mb-6">{item.description}</p>
                  <button 
                    className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300"
                    onClick={() => handleShopNow(item.link)} // Updated onClick handler
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;