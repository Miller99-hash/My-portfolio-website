
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    
    const currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'dark' : 'light');
    
   
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        let theme = 'light';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark';
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('theme', theme);
    });
    
    
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            
            
            if (mainNav.classList.contains('active')) {
                this.innerHTML = '<span class="sr-only">Close</span><i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<span class="sr-only">Menu</span><i class="fas fa-bars"></i>';
            }
        });
    }
    
    
    const greetingElement = document.getElementById('greeting-message');
    if (greetingElement) {
        const greeting = getGreeting();
        greetingElement.textContent = greeting;
    }
    
   
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length && portfolioItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                
                filterBtns.forEach(b => b.classList.remove('active'));
                
                
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                s
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    
    const toggleDetailsBtns = document.querySelectorAll('.toggle-details');
    
    if (toggleDetailsBtns.length) {
        toggleDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetDetails = document.getElementById(targetId);
                
                if (targetDetails) {
                    targetDetails.classList.toggle('hidden');
                    
                    if (!targetDetails.classList.contains('hidden')) {
                        this.textContent = 'Hide Details';
                    } else {
                        this.textContent = 'View Details';
                    }
                }
            });
        });
    }
    
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            let isValid = true;
            
            
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Please enter your name');
                isValid = false;
            } else {
                hideError(nameInput, nameError);
            }
            
            
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Please enter your email');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value)) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError(emailInput, emailError);
            }
            
            
            const phoneInput = document.getElementById('phone');
            const phoneError = document.getElementById('phone-error');
            const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            
            if (phoneInput.value.trim() && !phonePattern.test(phoneInput.value)) {
                showError(phoneInput, phoneError, 'Please enter a valid phone number');
                isValid = false;
            } else {
                hideError(phoneInput, phoneError);
            }
            
            
            const subjectInput = document.getElementById('subject');
            const subjectError = document.getElementById('subject-error');
            if (!subjectInput.value.trim()) {
                showError(subjectInput, subjectError, 'Please enter a subject');
                isValid = false;
            } else {
                hideError(subjectInput, subjectError);
            }
            
          
            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, 'Please enter your message');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, 'Message must be at least 10 characters');
                isValid = false;
            } else {
                hideError(messageInput, messageError);
            }
            
            
            const consentInput = document.getElementById('consent');
            const consentError = document.getElementById('consent-error');
            if (!consentInput.checked) {
                showError(null, consentError, 'You must consent to data storage');
                isValid = false;
            } else {
                hideError(null, consentError);
            }
            
            if (isValid) {
               
                const formSuccess = document.getElementById('form-success');
                formSuccess.classList.remove('hidden');
                contactForm.reset();
                
                
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }
        });
    }
    
    
    const surveyForm = document.getElementById('survey-form');
    if (surveyForm) {
        
        const contactConsent = document.getElementById('contact-consent');
        const emailField = document.getElementById('email-field');
        
        if (contactConsent && emailField) {
            contactConsent.addEventListener('change', function() {
                if (this.checked) {
                    emailField.classList.remove('hidden');
                } else {
                    emailField.classList.add('hidden');
                }
            });
        }
        
        
        const securityRating = document.getElementById('security-rating');
        const securityValue = document.getElementById('security-value');
        
        if (securityRating && securityValue) {
            securityValue.textContent = securityRating.value;
            
            securityRating.addEventListener('input', function() {
                securityValue.textContent = this.value;
            });
        }
        
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            let isValid = true;
            
            
            const requiredFields = [
                { input: 'profession', error: 'profession-error', message: 'Please enter your profession' },
                { input: 'experience', error: 'experience-error', message: 'Please select your experience level' },
                { input: 'security-challenges', error: 'security-challenges-error', message: 'Please select a challenge' },
                { input: 'network-challenges', error: 'network-challenges-error', message: 'Please describe your network security challenge' },
                { input: 'future-skills', error: 'future-skills-error', message: 'Please share your thoughts on future skills' }
            ];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field.input);
                const error = document.getElementById(field.error);
                
                if (!input.value.trim()) {
                    showError(input, error, field.message);
                    isValid = false;
                } else {
                    hideError(input, error);
                }
            });
            
            
            const sectorRadios = document.querySelectorAll('input[name="sector"]');
            const sectorError = document.getElementById('sector-error');
            let sectorSelected = false;
            
            sectorRadios.forEach(radio => {
                if (radio.checked) sectorSelected = true;
            });
            
            if (!sectorSelected) {
                showError(null, sectorError, 'Please select an industry sector');
                isValid = false;
            } else {
                hideError(null, sectorError);
            }
            
            
            const earlySecurityRadios = document.querySelectorAll('input[name="early-security"]');
            const earlySecurityError = document.getElementById('early-security-error');
            let earlySecuritySelected = false;
            
            earlySecurityRadios.forEach(radio => {
                if (radio.checked) earlySecuritySelected = true;
            });
            
            if (!earlySecuritySelected) {
                showError(null, earlySecurityError, 'Please select an option');
                isValid = false;
            } else {
                hideError(null, earlySecurityError);
            }
            
            
            const researchConsent = document.getElementById('research-consent');
            const researchConsentError = document.getElementById('research-consent-error');
            
            if (!researchConsent.checked) {
                showError(null, researchConsentError, 'You must consent to research usage');
                isValid = false;
            } else {
                hideError(null, researchConsentError);
            }
            
            
            if (contactConsent && contactConsent.checked) {
                const contactEmail = document.getElementById('contact-email');
                const contactEmailError = document.getElementById('contact-email-error');
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!contactEmail.value.trim()) {
                    showError(contactEmail, contactEmailError, 'Please enter your email for follow-up');
                    isValid = false;
                } else if (!emailPattern.test(contactEmail.value)) {
                    showError(contactEmail, contactEmailError, 'Please enter a valid email address');
                    isValid = false;
                } else {
                    hideError(contactEmail, contactEmailError);
                }
            }
            
            if (isValid) {
                
                const surveySuccess = document.getElementById('survey-success');
                surveySuccess.classList.remove('hidden');
                surveyForm.reset();
                
                
                setTimeout(() => {
                    surveySuccess.classList.add('hidden');
                }, 5000);
            }
        });
    }
});




function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return "Good morning, welcome to my portfolio!";
    } else if (hour >= 12 && hour < 18) {
        return "Good afternoon, welcome to my portfolio!";
    } else {
        return "Good evening, welcome to my portfolio!";
    }
}

function showError(input, errorElement, message) {
    if (input) {
        input.classList.add('error');
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(input, errorElement) {
    if (input) {
        input.classList.remove('error');
    }
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}