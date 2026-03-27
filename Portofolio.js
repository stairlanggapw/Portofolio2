document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready!');
    
    initNavigation();
    initTypingAnimation();
    initParticles();
    initScrollAnimations();
    initScrollToTop();
    initContactForm();
    initSmoothScrolling();
    initImageUpload();
    initFastHoverEffects(); 
});

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initTypingAnimation() {
    const typedTextSpan = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
    const textArray = ['Web Development', 'Full Stack Development', 'MERN Stack', 'React Development', 'Node.js', 'JavaScript'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursor.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursor.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);
}

function initParticles() {
    const canvas = document.querySelector('.particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.3) * 0.3;
            this.vy = (Math.random() - 0.3) * 0.3;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.3 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#00d4ff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    ctx.strokeStyle = '#00d4ff';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initFastHoverEffects() {
    document.querySelectorAll('.skill-item').forEach(skill => {
        let hoverTimeout;
        
        skill.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            skill.style.transform = 'translateY(-8px) scale(1.03)';
            skill.style.background = 'rgba(0, 212, 255, 0.1)';
            skill.style.borderColor = '#00d4ff';
            skill.style.boxShadow = '0 12px 30px rgba(0, 212, 255, 0.25)';
        });
        
        skill.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                skill.style.transform = 'translateY(0) scale(1)';
                skill.style.background = 'rgba(255, 255, 255, 0.05)';
                skill.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                skill.style.boxShadow = 'none';
            }, 50); 
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        let hoverTimeout;
        
        card.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            card.style.transform = 'translateY(-8px) rotateY(2deg)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.25)';
            card.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                card.style.transform = 'translateY(0) rotateY(0deg)';
                card.style.boxShadow = 'none';
                card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }, 50);
        });
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        let hoverTimeout;
        
        item.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            if (dot) {
                dot.style.transform = 'scale(1.3)';
                dot.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.6)';
            }
            if (content) {
                if (item.closest('.experience-timeline')) {
                    content.style.transform = 'translateX(10px)';
                } else {
                    content.style.transform = 'translateY(-5px)';
                }
                content.style.background = 'rgba(0, 212, 255, 0.08)';
                content.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                content.style.boxShadow = '0 8px 20px rgba(0, 212, 255, 0.15)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                if (dot) {
                    dot.style.transform = 'scale(1)';
                    dot.style.boxShadow = 'none';
                }
                if (content) {
                    content.style.transform = 'translateY(0) translateX(0)';
                    content.style.background = 'rgba(255, 255, 255, 0.05)';
                    content.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    content.style.boxShadow = 'none';
                }
            }, 50);
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    addImageUrlInput();
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .timeline-item, .about-text, .about-image');

    animatedElements.forEach((el) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #4CAF50, #45a049);' : 'background: linear-gradient(45deg, #f44336, #da190b);'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; 
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add some interactive hover effects with optimized performance
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Add subtle cursor following effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const rect = hero.getBoundingClientRect();
            if (mouseY >= rect.top && mouseY <= rect.bottom) {
                const x = (mouseX / window.innerWidth) * 100;
                const y = (mouseY / window.innerHeight) * 100;
                
                hero.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)`;
            }
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements with faster timing
    const heroElements = document.querySelectorAll('.hero-title, .typing-container, .cta-button, .social-links');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.4s ease'; // Reduced from 0.6s
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150 + 300); // Reduced delays
    });
});

// Add parallax effect to hero section with throttling for better performance
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && scrolled < hero.offsetHeight) {
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add dynamic background color change based on section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.body.className = `section-${sectionId}`;
        }
    });
});


