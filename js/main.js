document.addEventListener('DOMContentLoaded', () => {
    initRTL();
    initMobileMenu();
    initHeaderScroll();
    initTheme();
    initAuthForms();
    initMapInteractivity();
});

/**
 * Interactive Map Interactivity
 */
function initMapInteractivity() {
    const markers = document.querySelectorAll('.marker-group');
    const tooltip = document.getElementById('map-tooltip');

    if (markers.length > 0 && tooltip) {
        markers.forEach(marker => {
            marker.addEventListener('mousemove', (e) => {
                const location = marker.getAttribute('data-location');
                tooltip.textContent = location;
                tooltip.style.display = 'block';
                tooltip.style.left = (e.clientX + 15) + 'px';
                tooltip.style.top = (e.clientY + 15) + 'px';
            });

            marker.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });

            marker.addEventListener('click', () => {
                const targetId = marker.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Optional: Highlight the card briefly
                    targetElement.style.borderColor = 'var(--primary-color)';
                    targetElement.style.boxShadow = '0 0 20px var(--primary-glow)';
                    setTimeout(() => {
                        targetElement.style.boxShadow = '';
                    }, 2000);
                }
            });
        });
    }
}

/**
 * Handle Theme Toggle
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlTag = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('site-theme') || 'dark';
    htmlTag.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlTag.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlTag.setAttribute('data-theme', newTheme);
            localStorage.setItem('site-theme', newTheme);
            updateThemeButton(newTheme);
        });
    }
}

function updateThemeButton(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

/**
 * Handle Auth Form Switching
 */
function initAuthForms() {
    const toggleBtns = document.querySelectorAll('.auth-toggle-btn');
    const authForms = document.querySelectorAll('.auth-form');

    if (toggleBtns.length > 0) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');

                // Reset active states
                toggleBtns.forEach(b => b.classList.remove('active'));
                authForms.forEach(f => f.classList.remove('active'));

                // Set new active state
                btn.classList.add('active');
                const targetForm = document.getElementById(targetId);
                if (targetForm) targetForm.classList.add('active');
            });
        });
    }
}

/**
 * Handle RTL Toggle
 */
function initRTL() {
    const rtlToggle = document.getElementById('rtl-toggle');
    const htmlTag = document.documentElement;

    // Check saved preference
    const savedDir = localStorage.getItem('site-dir') || 'ltr';
    htmlTag.setAttribute('dir', savedDir);
    updateRTLButton(savedDir);

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = htmlTag.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

            htmlTag.setAttribute('dir', newDir);
            localStorage.setItem('site-dir', newDir);
            updateRTLButton(newDir);

            // Re-initialize any RTL dependent components if needed
            window.location.reload(); // Simple way to ensure all RTL styles/layouts apply correctly
        });
    }
}

function updateRTLButton(dir) {
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        rtlToggle.textContent = dir === 'ltr' ? 'עברית / RTL' : 'English / LTR';
    }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });
    }
}

/**
 * Header background opacity on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    const scrollBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            header.style.padding = '5px 0';
            header.style.background = 'rgba(13, 9, 4, 0.98)';
            if (scrollBtn) scrollBtn.classList.add('visible');
        } else {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(13, 9, 4, 0.95)';
            if (scrollBtn) scrollBtn.classList.remove('visible');
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
