document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const allButtons = document.querySelectorAll('button, a.hero-button, a.social-button');

    // Load saved theme from localStorage, defaulting to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.querySelector('.icon').textContent = '☀️';
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeToggle.querySelector('.icon').textContent = '🌙';
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.querySelector('.icon').textContent = '☀️';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.querySelector('.icon').textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.toggle('active');

            if (isActive) {
                // Expand the answer
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingTop = '1rem';
            } else {
                // Collapse the answer
                answer.style.maxHeight = '0';
                answer.style.paddingTop = '0';
            }
        });
    });

    // Gradient Rotation on Button Click
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('rotate-button-gradient');
            setTimeout(() => {
                button.classList.remove('rotate-button-gradient');
            }, 700); // Duration matches the CSS animation
        });
    });

    // Intersecton Observer for scroll animations
    const animatedSections = document.querySelectorAll('.main-hero, .bot-section, .contact-section, .faq-section, .footer');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Stop observing once it's animated
            }
        });
    }, {
        threshold: 0.2 // Trigger animation when 20% of the section is visible
    });

    animatedSections.forEach(section => {
        observer.observe(section);
    });
});
