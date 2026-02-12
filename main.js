// Portfolio - Mobile First JavaScript
(function() {
    'use strict';

    // Elements
    const header = document.querySelector('.s-header');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // Header scroll effect
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Back to top button
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Smooth scroll
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight + 20;

            window.scrollTo({
                top: targetPosition,
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

    // Active nav link
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
        const heroSection = document.querySelector('.hero-section');
        const currentScrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
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

    // Initialize
    function init() {
        window.addEventListener('scroll', onScroll, { passive: true });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScroll);
        });

        // Initial calls
        handleHeaderScroll();
        handleBackToTop();
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
