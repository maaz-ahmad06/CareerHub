document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PAGE PRELOADER (2.5s duration)
    // ==========================================
    const preloader = document.getElementById('preloader');
    const body = document.body;

    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
            body.classList.remove('loading');
        }
        
        // Trigger reveal of hero content after preloader finishes
        revealOnScroll();
    }, 2500); // 2.5 seconds loader screen

    // ==========================================
    // 2. STICKY HEADER & ACTIVE LINKS ON SCROLL
    // ==========================================
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // ==========================================
    // 3. MOBILE HAMBURGER MENU
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Change hamburger icon to close icon
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'bx bx-x';
            } else {
                icon.className = 'bx bx-menu-alt-right';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                icon.className = 'bx bx-menu-alt-right';
            });
        });
    }

    // ==========================================
    // 4. FEATURED JOBS FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to current button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            jobCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Add fade-out transition, filter, and fade-in
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ==========================================
    // 5. TESTIMONIALS SLIDER
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        // Auto play slider every 6 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 6000);
    }

    // ==========================================
    // 6. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    
    // Quick search interactive confirmation (visual response)
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const title = document.getElementById('searchTitle').value.trim();
            const loc = document.getElementById('searchLoc').value.trim();
            const cat = document.getElementById('searchCategory').value;

            if (title || loc || cat) {
                alert(`Searching for: \nJob: ${title || 'Any'}\nLocation: ${loc || 'Any'}\nCategory: ${cat || 'Any'}`);
            } else {
                alert('Please input search parameters first!');
            }
        });
    }
});
