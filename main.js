// Hybrid Design JavaScript
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
            // At top - show
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        } else if (currentScrollY > 0 && currentScrollY < heroHeight - navbarHeight) {
            // In hero - hide
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
        } else {
            // Past hero - show
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
            
            // Check if element is in viewport
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

    // Initialize
    function init() {
        // Set header transition
        header.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out, background 0.3s ease';
        
        // Event listeners
        window.addEventListener('scroll', function() {
            handleHeaderScroll();
            handleBackToTop();
            updateActiveNav();
            toggleNavbar();
        });

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
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
