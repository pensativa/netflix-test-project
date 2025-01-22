import Swiper  from 'swiper';
import { Navigation } from 'swiper/modules';

const swiper = new Swiper(".slider", {
    slidesPerView: 5,
    loop: true,
    spaceBetween: 40,
    modules: [ Navigation ],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      520: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    },
});

swiper.slideNext();