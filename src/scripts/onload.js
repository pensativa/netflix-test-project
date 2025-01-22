import gsap from 'gsap';
import ScrollTrigger from '/node_modules/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const animatedElements = document.querySelectorAll('.animate');

    animatedElements.forEach((element, index) => {
        gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 50,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none", 
            },
        }
        );
    });

    gsap.fromTo(
        '.animate-right',
        {
            opacity: 0,
            xPercent: 100,
        },
        {
            opacity: 1,
            xPercent: 0,
            duration: 1,
            delay: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.animate-right',
                start: "top 90%",
                toggleActions: "play none none none", 
            },
        }
        );
});