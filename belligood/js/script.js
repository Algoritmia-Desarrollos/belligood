document.addEventListener('DOMContentLoaded', function() {

    // 1. NAVEGACIÓN Y HEADER
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Cambiar header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. SLIDERS AUTOMÁTICOS
    function createSlider(sliderSelector, slideSelector, intervalTime) {
        const slides = document.querySelectorAll(slideSelector);
        if (slides.length === 0) return;

        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Iniciar el slider
        setInterval(nextSlide, intervalTime);
    }

    // Iniciar sliders específicos
    createSlider('.hero-slider', '.hero-slider .slide', 6000); // Slider del Hero cada 6 segundos
    createSlider('.testimonial-slider', '.testimonial-slider .testimonial', 7000); // Slider de Testimonios cada 7 segundos


    // 3. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Opcional: dejar de observar el elemento una vez que es visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // El elemento se animará cuando al menos el 10% sea visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});