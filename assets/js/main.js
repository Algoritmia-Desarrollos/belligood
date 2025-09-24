document.addEventListener('DOMContentLoaded', function () {

    // --- Funcionalidad para el menú móvil ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Funcionalidad para las pestañas de servicios ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtener el ID del contenido a mostrar desde el atributo data-tab del botón
            const tabId = button.dataset.tab;
            const activeContent = document.getElementById(tabId);

            // 1. Ocultar todos los contenidos y desactivar todos los botones
            tabContents.forEach(content => {
                content.classList.add('hidden'); // Ocultar contenido
            });

            tabButtons.forEach(btn => {
                btn.classList.remove('text-primary', 'border-primary'); // Quitar estilos activos
                btn.classList.add('text-secondary', 'border-transparent'); // Añadir estilos inactivos
            });

            // 2. Mostrar el contenido y activar el botón seleccionado
            if (activeContent) {
                activeContent.classList.remove('hidden'); // Mostrar contenido activo
            }
            button.classList.remove('text-secondary', 'border-transparent'); // Quitar estilos inactivos
            button.classList.add('text-primary', 'border-primary'); // Añadir estilos activos
        });
    });

    // --- Para que los enlaces del menú con # hagan scroll suave ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});