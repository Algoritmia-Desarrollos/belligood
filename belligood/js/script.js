document.addEventListener('DOMContentLoaded', function() {

    // --- 1. CARGA MODULAR DE HEADER Y FOOTER ---
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                if (id === 'header-placeholder') initializeHeader();
                if (id === 'footer-placeholder') document.getElementById('year').textContent = new Date().getFullYear();
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');

    // --- 2. LÓGICA DEL HEADER (MENÚ MÓVIL Y SCROLL) ---
    function initializeHeader() {
        const header = document.getElementById('header');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
        }
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if(navMenu && navMenu.classList.contains('active')) navMenu.classList.remove('active');
            });
        });
        window.addEventListener('scroll', () => {
            if (header && window.scrollY > 50) {
                header.classList.add('scrolled');
            } else if (header) {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 3. SLIDER AUTOMÁTICO DEL HERO ---
    if(document.querySelector('.hero-slider')) {
        let heroSlides = document.querySelectorAll('.hero-slider .slide');
        if (heroSlides.length > 1) {
            let currentHeroSlide = 0;
            setInterval(() => {
                currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
                heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === currentHeroSlide));
            }, 6000);
        }
    }

    // --- 4. FILTRO DE PORTFOLIO (TABS) ---
    const filterContainer = document.querySelector('.portfolio-filters');
    if (filterContainer) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                const filterValue = e.target.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    item.classList.toggle('hide', !(item.dataset.category === filterValue || filterValue === 'all'));
                });
            }
        });
    }

    // --- 5. SLIDER INTERACTIVO DE TESTIMONIOS ---
    const testimonialsSlider = document.querySelector('.testimonial-slider-interactive');
    if(testimonialsSlider){
        const slides = testimonialsSlider.querySelectorAll('.testimonial');
        const nextBtn = document.querySelector('.slider-btn.next');
        const prevBtn = document.querySelector('.slider-btn.prev');
        if (slides.length > 1) {
            let currentSlide = 0;
            const showSlide = (index) => slides.forEach((s, i) => s.classList.toggle('active', i === index));
            nextBtn.addEventListener('click', () => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); });
            prevBtn.addEventListener('click', () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); });
        } else {
             if(nextBtn) nextBtn.style.display = 'none';
             if(prevBtn) prevBtn.style.display = 'none';
        }
    }

    // --- 6. NUEVO: LÓGICA PARA TABS DE PRECIOS EN PÁGINA DE LÁSER ---
    const pricingTabsContainer = document.querySelector('.pricing-tabs');
    if (pricingTabsContainer) {
        const tabLinks = pricingTabsContainer.querySelectorAll('.tab-link');
        const pricingContents = document.querySelectorAll('.pricing-content');

        tabLinks.forEach(tab => {
            tab.addEventListener('click', () => {
                // Desactivar todos
                tabLinks.forEach(link => link.classList.remove('active'));
                pricingContents.forEach(content => content.classList.remove('active'));

                // Activar el seleccionado
                tab.classList.add('active');
                document.getElementById(tab.dataset.target).classList.add('active');
            });
        });
    }

    // --- 7. ANIMACIONES AL HACER SCROLL ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
});



// ... (pega esto al final de tu archivo script.js, ANTES del último paréntesis) ...

    // --- 8. LÓGICA PARA FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const captchaQuestionEl = document.getElementById('captcha-question');
        const captchaInput = document.getElementById('captcha');
        const formMessage = document.getElementById('form-message');
        
        let num1 = Math.ceil(Math.random() * 10);
        let num2 = Math.ceil(Math.random() * 5);
        let correctAnswer = num1 + num2;

        captchaQuestionEl.textContent = `${num1} + ${num2} = `;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenimos el envío real para validarlo primero

            const userAnswer = parseInt(captchaInput.value, 10);
            
            if (userAnswer !== correctAnswer) {
                formMessage.textContent = "El resultado de la suma es incorrecto. Inténtalo de nuevo.";
                formMessage.style.color = 'red';
            } else {
                // Si la validación es correcta, aquí es donde enviarías el formulario.
                // Para este ejemplo, solo mostraremos un mensaje de éxito.
                // En un caso real, descomentarías la línea 'contactForm.submit()' o usarías AJAX.
                
                formMessage.textContent = "¡Mensaje enviado correctamente! Gracias por contactarnos.";
                formMessage.style.color = 'green';
                contactForm.reset(); // Limpia el formulario

                // Genera una nueva pregunta para el próximo intento
                num1 = Math.ceil(Math.random() * 10);
                num2 = Math.ceil(Math.random() * 5);
                correctAnswer = num1 + num2;
                captchaQuestionEl.textContent = `${num1} + ${num2} = `;
            }
        });
    }