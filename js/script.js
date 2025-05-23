document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.display = 'none';
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Typed.js initialization
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: ['Full-Stack Developer', 'Software Engineer', 'Web Designer', 'Prompt Engineer', 'Data Scientist', 'Database Engineer'],
            typeSpeed: 70,
            backSpeed: 30,
            loop: true
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.skill-item, .education-item, .project-card, .info-item');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

// Blog Post JS
document.addEventListener('DOMContentLoaded', function() {
    // Blog card hover effect
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Change button state
            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';
            submitSpinner.classList.remove('d-none');
            formFeedback.classList.add('d-none');
            
            try {
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value || 'No subject',
                    message: document.getElementById('message').value,
                    date: new Date().toLocaleString()
                };

                // Send email to you (portfolio owner)
                await emailjs.send(
                    'service_x9yhl96', 
                    'template_pj93piq', 
                    {
                        ...formData,
                        email_subject: `New message from ${formData.name}`,
                        recipient_email: 'your-email@example.com', // Your email
                        recipient_name: 'Your Name' // Your name
                    }
                );

                // Send confirmation email to client
                await emailjs.send(
                    'service_x9yhl96',
                    'template_54m2a48',
                    {
                        ...formData,
                        email_subject: 'Thank you for your message',
                        recipient_email: formData.email, // Client's email
                        recipient_name: formData.name // Client's name
                    }
                );

                // Show success message
                showFeedback('Message sent successfully! A confirmation has been sent to your email.', 'success');
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                // Show error message
                showFeedback('Failed to send message. Please try again or contact me directly.', 'danger');
                console.error('Email sending failed:', error);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitSpinner.classList.add('d-none');
            }
        });
        
        // Add input event listeners for live validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
    
    function validateForm() {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    }
    
    function showFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = `alert alert-${type}`;
        formFeedback.classList.remove('d-none');
        
        // Hide feedback after 5 seconds
        setTimeout(() => {
            formFeedback.classList.add('d-none');
        }, 5000);
    }
});