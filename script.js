document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Custom Cursor Glow Follow ---
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for smooth performance
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    });

    // Expand cursor on clicking or hovering over links
    const interactiveElements = document.querySelectorAll('a, button, .glass-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.5)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
    });

    // --- 2. Mobile Sidebar Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-menu a');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuToggle.innerHTML = sidebar.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close sidebar on link click (Mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                sidebar.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // --- 3. Typing Effect (Using Typed.js) ---
    new Typed('#typing-text', {
        strings: [
            'Digital Marketer', 
            'SEO Specialist', 
            'Performance Marketer', 
            'Meta Ads Expert'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
    });

    // --- 4. Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // --- 5. GSAP Scroll Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Fade Up Reveal
    gsap.utils.toArray('.gsap-reveal').forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Slide in from Left
    gsap.utils.toArray('.gsap-reveal-left').forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, x: -50 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                }
            }
        );
    });

    // Slide in from Right
    gsap.utils.toArray('.gsap-reveal-right').forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, x: 50 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                }
            }
        );
    });

    // Staggered Cards Reveal (Services, Portfolio, Skills)
    const staggerContainers = ['.services-left', '.portfolio-grid', '.skills-grid'];
    staggerContainers.forEach(containerSelector => {
        const container = document.querySelector(containerSelector);
        if(container) {
            gsap.fromTo(container.querySelectorAll('.gsap-stagger'),
                { opacity: 0, y: 40 },
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%"
                    }
                }
            );
        }
    });
    
    // Animate Progress Bars on Scroll
    gsap.utils.toArray('.progress').forEach(bar => {
        const targetWidth = bar.style.width;
        gsap.fromTo(bar, 
            { width: 0 }, 
            {
                width: targetWidth,
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 90%"
                }
            }
        );
    });
});