document.addEventListener('DOMContentLoaded', function () {

    // Función genérica para cargar componentes HTML
    const loadComponent = async (url, placeholderId) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
            const html = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                // Reemplazamos el placeholder en lugar de usar innerHTML para evitar crear un div extra
                placeholder.outerHTML = html;
            }
        } catch (error) {
            console.error(`Error al cargar el componente ${placeholderId}:`, error);
        }
    };

    // Función para inicializar todos los scripts después de cargar los componentes
    const initializeScripts = () => {
        // --- Funcionalidad para el navbar transparente al hacer scroll ---
        const navbar = document.getElementById('navbar');
        if (navbar) {
            // Función para manejar el estado del navbar en la página principal
            const handleHeroNavbar = () => {
                const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
                const heroSection = document.querySelector('.h-\[85vh\]'); // Selector para la sección hero
                
                if (isHomePage && heroSection) {
                    // Texto blanco en la sección hero
                    navbar.classList.add('text-white');
                    navbar.classList.remove('text-secondary');

                    window.addEventListener('scroll', () => {
                        if (window.scrollY > 50) {
                            navbar.classList.add('bg-white', 'shadow-md');
                            navbar.classList.remove('text-white');
                            navbar.classList.add('text-secondary');
                        } else {
                            navbar.classList.remove('bg-white', 'shadow-md');
                            navbar.classList.add('text-white');
                            navbar.classList.remove('text-secondary');
                        }
                    });
                } else {
                    // Comportamiento por defecto en otras páginas
                    navbar.classList.add('bg-white', 'shadow-md', 'sticky');
                    navbar.classList.remove('fixed', 'text-white');
                    navbar.classList.add('text-secondary');
                }
            };

            // Llama a la función al cargar la página
            handleHeroNavbar();
        }

        // --- Funcionalidad para el menú móvil y su submenú ---
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const serviciosToggle = document.getElementById('servicios-toggle');
        const serviciosSubmenu = document.getElementById('servicios-submenu-mobile');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
        }
        if (serviciosToggle && serviciosSubmenu) {
            serviciosToggle.addEventListener('click', () => {
                serviciosSubmenu.classList.toggle('hidden');
                serviciosToggle.querySelector('i').classList.toggle('rotate-180');
            });
        }
        
        // --- Funcionalidad para las pestañas de servicios (si existen en la página) ---
        const tabButtons = document.querySelectorAll('.tab-button');
        if (tabButtons.length > 0) {
            const tabContents = document.querySelectorAll('.tab-content');
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.dataset.tab;
                    const activeContent = document.getElementById(tabId);
                    
                    tabContents.forEach(content => content.classList.add('hidden'));
                    tabButtons.forEach(btn => {
                        btn.classList.remove('bg-primary', 'text-white');
                        btn.classList.add('bg-white', 'text-secondary');
                    });
                    
                    if (activeContent) activeContent.classList.remove('hidden');
                    button.classList.remove('bg-white', 'text-secondary');
                    button.classList.add('bg-primary', 'text-white');
                });
            });
        }

        // --- Funcionalidad para el formulario de contacto a WhatsApp (si existe en la página) ---
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
        
        // --- Funcionalidad para el filtro de la galería (si existe en la página) ---
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
    };

    // Carga todos los componentes reutilizables y LUEGO inicializa los scripts
    const loadAllComponents = async () => {
        await Promise.all([
            loadComponent('/navbar.html', 'navbar-placeholder'),
            loadComponent('/footer.html', 'footer-placeholder')
        ]);
        initializeScripts();
    };

    loadAllComponents();
});