// Portfolio - Mobile First JavaScript
(function() {
    'use strict';

    const header = document.querySelector('.s-header');
    const heroSection = document.querySelector('.hero-section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Header sticky on scroll
    function handleHeaderScroll() {
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        const scrollY = window.scrollY;

        if (scrollY > heroHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Smooth scroll for anchor links
    function smoothScroll(e) {
        const href = this.getAttribute('href');
        if (!href || href.charAt(0) !== '#' || href === '#0') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPos = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });

            // Close mobile navbar after clicking a link
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        }
    }

    // Active nav link highlight
    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Navbar hide/show in hero section
    function toggleNavbar() {
        const currentScrollY = window.scrollY;
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        const navbarHeight = header.offsetHeight;

        if (currentScrollY === 0) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        } else if (currentScrollY > 0 && currentScrollY < heroHeight - navbarHeight) {
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
    }

    // Back to top button
    function handleBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    // Animate stats numbers
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(stat);
        });
    }

    // Set incrementing numbers for section headers
    function setSectionHeaderNumbers() {
        const sectionHeaders = document.querySelectorAll('.section-header h2');

        sectionHeaders.forEach((header, index) => {
            const number = (index + 1).toString().padStart(2, '0');
            header.style.setProperty('--section-number', "'" + number + "'");
        });
    }

    // Throttle scroll events for performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleHeaderScroll();
                handleBackToTop();
                updateActiveNav();
                toggleNavbar();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Loading screen
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }

    // Initialize
    function init() {
        // Hide loading screen when page is fully loaded
        window.addEventListener('load', hideLoadingScreen);

        window.addEventListener('scroll', onScroll, { passive: true });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScroll);
        });

        // Initial calls
        handleHeaderScroll();
        updateActiveNav();
        toggleNavbar();
        animateStats();
        setSectionHeaderNumbers();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
