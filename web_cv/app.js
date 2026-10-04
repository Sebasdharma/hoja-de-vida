/**
 * CV Profesional - Jhoel Sebastian Reina Gordon
 * Interactive JavaScript Engine
 * Universidad Politécnica Estatal del Carchi (UPEC)
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSkillsFilter();
    initAccordion();
    initContactForm();
    initPrintCV();
    initScrollSpy();
    initTypingEffect();
    initMobileMenu();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('cv_theme') || 'dark';
    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('cv_theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        }
    }
}

/* ==========================================================================
   2. Skills Dynamic Filter
   ========================================================================== */
function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   3. Interactive Accordion (Experience & Education)
   ========================================================================== */
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const expandAllBtn = document.getElementById('expand-all-btn');
    const collapseAllBtn = document.getElementById('collapse-all-btn');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                if (isActive) {
                    item.classList.remove('active');
                    header.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', () => {
            accordionItems.forEach(item => {
                item.classList.add('active');
                const header = item.querySelector('.accordion-header');
                if (header) header.setAttribute('aria-expanded', 'true');
            });
            showToast('Todas las secciones fueron expandidas', 'success');
        });
    }

    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', () => {
            accordionItems.forEach(item => {
                item.classList.remove('active');
                const header = item.querySelector('.accordion-header');
                if (header) header.setAttribute('aria-expanded', 'false');
            });
            showToast('Todas las secciones fueron colapsadas', 'success');
        });
    }
}

/* ==========================================================================
   4. Contact Form Validation & Feedback
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const charCounter = document.getElementById('char-count');

    if (messageInput && charCounter) {
        messageInput.addEventListener('input', () => {
            charCounter.textContent = messageInput.value.length;
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            clearErrors();

            if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
                showError('name-error', 'Por favor ingresa tu nombre completo (mínimo 3 caracteres).');
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                showError('email-error', 'Ingresa una dirección de correo electrónico válida.');
                isValid = false;
            }

            if (!subjectInput.value.trim() || subjectInput.value.trim().length < 4) {
                showError('subject-error', 'Por favor especifica un asunto relevante.');
                isValid = false;
            }

            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                showError('message-error', 'El mensaje debe contener al menos 10 caracteres.');
                isValid = false;
            }

            if (isValid) {
                showToast(`¡Gracias ${nameInput.value.trim()}! Tu mensaje ha sido registrado exitosamente hacia 10cdreinasebastian@gmail.com.`, 'success');
                form.reset();
                if (charCounter) charCounter.textContent = '0';
            } else {
                showToast('Por favor corrige los campos señalados.', 'error');
            }
        });
    }

    function showError(elementId, message) {
        const errorElem = document.getElementById(elementId);
        if (errorElem) errorElem.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    }
}

/* ==========================================================================
   5. Toast Floating Notifications
   ========================================================================== */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* ==========================================================================
   6. Export to PDF / Print
   ========================================================================== */
function initPrintCV() {
    const printBtn = document.getElementById('print-cv-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            // Expand all accordion items before print
            document.querySelectorAll('.accordion-item').forEach(item => item.classList.add('active'));
            window.print();
        });
    }
}

/* ==========================================================================
   7. Typing Effect for Subtitle
   ========================================================================== */
function initTypingEffect() {
    const typedElement = document.getElementById('typed-element');
    if (!typedElement) return;

    const phrases = [
        'Especialista Full Stack & Móvil',
        'Desarrollador Flutter & Android',
        'Ingeniero .NET C# & Arquitecturas Web',
        'Certificado en Inteligencia Artificial'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ==========================================================================
   8. Scroll Spy & Navbar Shadow
   ========================================================================== */
function initScrollSpy() {
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

/* ==========================================================================
   9. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isVisible = navMenu.style.display === 'flex';
            navMenu.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '72px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'var(--bg-secondary)';
                navMenu.style.padding = '1.5rem';
                navMenu.style.borderBottom = '1px solid var(--border)';
            }
        });
    }
}
