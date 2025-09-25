document.addEventListener('DOMContentLoaded', function () {

    // --- CARGADOR DE COMPONENTES (NAVBAR Y FOOTER) ---
    const loadComponent = async (url, placeholderId) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
            const html = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.outerHTML = html;
            }
        } catch (error) {
            console.error(`Error al cargar el componente ${placeholderId}:`, error);
        }
    };

    // --- FUNCIÓN PRINCIPAL QUE INICIALIZA TODO EL SCRIPT ---
    const initializeScripts = () => {
        
        // --- LÓGICA DEL MENÚ MÓVIL ---
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuBtn && mobileMenu) {
            // Re-clonamos el menú de escritorio para el móvil para simplificar
            const navLinks = document.querySelector('.nav-links').cloneNode(true);
            mobileMenu.appendChild(navLinks);
            
            menuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
                mobileMenu.style.display = isHidden ? 'block' : 'none';
            });
        }

        // --- LÓGICA DEL FORMULARIO DE CONTACTO A WHATSAPP ---
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const phone = '34659306394';
                const nombre = document.getElementById('nombre').value;
                const apellido = document.getElementById('apellido').value;
                const telefono = document.getElementById('telefono').value;
                const email = document.getElementById('email').value;
                const consulta = document.getElementById('consulta').value;
                let message = `¡Hola! Quisiera hacer una consulta:\n\n*Nombre:* ${nombre} ${apellido}\n*Teléfono:* ${telefono}\n*Email:* ${email}\n*Consulta:* ${consulta}`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
                window.open(whatsappURL, '_blank');
            });
        }
        
        // --- LÓGICA DEL FILTRO DE LA GALERÍA ---
        const galleryFilters = document.getElementById('gallery-filters');
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryFilters && galleryItems.length > 0) {
            galleryFilters.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    galleryFilters.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    const filter = e.target.dataset.filter;
                    galleryItems.forEach(item => {
                        item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
                    });
                }
            });
        }

        // --- ¡NUEVA LÓGICA PARA EL CARRUSEL DE TESTIMONIOS! ---
        const setupTestimonialCarousel = () => {
            const carousel = document.querySelector('.testimonial-carousel');
            if (!carousel) return;

            const track = carousel.querySelector('.slider-track');
            const slides = Array.from(track.children);
            const nextButton = carousel.querySelector('.next');
            const prevButton = carousel.querySelector('.prev');
            
            if (slides.length === 0) return;

            let currentIndex = 0;
            let isMoving = false;
            const totalSlides = slides.length;

            const getSlidesToShow = () => {
                if (window.innerWidth <= 768) return 1;
                if (window.innerWidth <= 1024) return 2;
                return 3;
            };

            let slidesToShow = getSlidesToShow();

            // Clonar slides para el efecto infinito
            const setupClones = () => {
                // Limpiar clones anteriores si la ventana se redimensiona
                track.innerHTML = "";
                slides.forEach(slide => track.appendChild(slide.cloneNode(true)));

                // Clonar los últimos para el principio
                for (let i = slides.length - 1; i >= slides.length - slidesToShow; i--) {
                    const clone = slides[i % slides.length].cloneNode(true);
                    clone.classList.add('clone');
                    track.insertBefore(clone, track.firstChild);
                }
                // Clonar los primeros para el final
                for (let i = 0; i < slidesToShow; i++) {
                    const clone = slides[i % slides.length].cloneNode(true);
                    clone.classList.add('clone');
                    track.appendChild(clone);
                }
            };

            const getSlideFullWidth = () => {
                const firstSlide = track.querySelector('.slide');
                if (!firstSlide) return 0;
                const slideStyle = getComputedStyle(firstSlide);
                const margin = parseInt(slideStyle.marginRight) + parseInt(slideStyle.marginLeft) || 0;
                return firstSlide.offsetWidth + margin;
            };

            const updateCarouselPosition = (withTransition = true) => {
                const currentPosition = currentIndex + slidesToShow;
                track.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
                track.style.transform = `translateX(-${currentPosition * getSlideFullWidth()}px)`;
            };
            
            const moveNext = () => {
                if (isMoving) return;
                isMoving = true;
                currentIndex++;
                updateCarouselPosition();
            };

            const movePrev = () => {
                if (isMoving) return;
                isMoving = true;
                currentIndex--;
                updateCarouselPosition();
            };

            nextButton.addEventListener('click', moveNext);
            prevButton.addEventListener('click', movePrev);

            track.addEventListener('transitionend', () => {
                isMoving = false;
                if (currentIndex >= totalSlides) {
                    currentIndex = 0;
                    updateCarouselPosition(false);
                } else if (currentIndex < 0) {
                    currentIndex = totalSlides - 1;
                    updateCarouselPosition(false);
                }
            });
            
            const init = () => {
                slidesToShow = getSlidesToShow();
                setupClones();
                updateCarouselPosition(false);
            };
            
            window.addEventListener('resize', init);
            init();
        };

        // Llamar a la función del carrusel
        setupTestimonialCarousel();
    };

    // --- PROCESO DE CARGA: PRIMERO HTML, LUEGO SCRIPTS ---
    const loadAllComponents = async () => {
        await Promise.all([
            loadComponent('/navbar.html', 'navbar-placeholder'),
            loadComponent('/footer.html', 'footer-placeholder')
        ]);
        // Una vez que el HTML está cargado, inicializamos todos los scripts
        initializeScripts();
    };

    loadAllComponents();
});