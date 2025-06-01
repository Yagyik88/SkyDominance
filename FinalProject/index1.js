document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        const currentPage = location.pathname.split('/').pop() || 'index1.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
    
    // Sticky Navigation
    const nav = document.querySelector('.main-nav');
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > heroHeight * 0.1) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .jet-card, .section-title, .section-subtitle');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.category-card, .jet-card, .section-title, .section-subtitle');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Jet Category Navigation
const categoryLinks = document.querySelectorAll('.category-link');
const jetCategories = document.querySelectorAll('.jet-category');

// Highlight active category based on scroll position
window.addEventListener('scroll', function() {
    let current = '';
    
    jetCategories.forEach(category => {
        const categoryTop = category.offsetTop;
        const categoryHeight = category.clientHeight;
        
        if (pageYOffset >= (categoryTop - 200)) {
            current = category.getAttribute('id');
        }
    });
    
    categoryLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for category links
categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.main-nav').offsetHeight + document.querySelector('.jet-categories-nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update or add this to your existing smooth scrolling code
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        let additionalOffset = 0;
        
        // Add extra offset if we're scrolling to the quote section
        if (targetId === '#quick-quote') {
          additionalOffset = 20;
        }
        
        const targetPosition = targetElement.getBoundingClientRect().top + 
                             window.pageYOffset - 
                             navHeight - 
                             additionalOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (document.querySelector('.nav-links').classList.contains('active')) {
          document.querySelector('.mobile-menu-btn').classList.remove('active');
          document.querySelector('.nav-links').classList.remove('active');
        }
      }
    });
  });

  