// auth.js

document.addEventListener('DOMContentLoaded', function() {
    // Переключение видимости пароля
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Проверка сложности пароля (для страницы регистрации)
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    // Проверка совпадения паролей
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            
            if (confirmPassword.length > 0) {
                if (password !== confirmPassword) {
                    showError('confirmPasswordError', 'Пароли не совпадают');
                } else {
                    clearError('confirmPasswordError');
                }
            } else {
                clearError('confirmPasswordError');
            }
        });
    }
    
    // Обработка формы входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Сброс ошибок
            clearAllErrors();
            
            // Валидация
            let isValid = true;
            
            if (!validateEmail(email)) {
                showError('emailError', 'Введите корректный email адрес');
                isValid = false;
            }
            
            if (password.length < 6) {
                showError('passwordError', 'Пароль должен содержать минимум 6 символов');
                isValid = false;
            }
            
            if (isValid) {
                // Симуляция отправки формы
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
                submitBtn.disabled = true;
                
                // Имитация запроса
                setTimeout(() => {
                    alert('Вход успешно выполнен!');
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
    
    // Обработка формы регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных
            const firstName = document.getElementById('firstName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const terms = document.getElementById('terms').checked;
            
            // Сброс ошибок
            clearAllErrors();
            
            // Валидация
            let isValid = true;
            
            if (firstName.length < 2) {
                showError('firstNameError', 'Имя должно содержать минимум 2 символа');
                isValid = false;
            }
            
            if (!validateEmail(email)) {
                showError('emailError', 'Введите корректный email адрес');
                isValid = false;
            }
            
            if (!checkPasswordRequirements(password)) {
                showError('passwordError', 'Пароль не соответствует требованиям');
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                showError('confirmPasswordError', 'Пароли не совпадают');
                isValid = false;
            }
            
            if (!terms) {
                showError('termsError', 'Необходимо принять условия использования');
                isValid = false;
            }
            
            if (isValid) {
                // Симуляция отправки формы
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Создание аккаунта...';
                submitBtn.disabled = true;
                
                // Имитация запроса
                setTimeout(() => {
                    alert('Аккаунт успешно создан! Вы вошли в систему.');
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }
    
    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Проверка требований к паролю
    function checkPasswordRequirements(password) {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return hasMinLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    }
    
    // Проверка сложности пароля
    function checkPasswordStrength(password) {
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        
        // Сброс требований
        const requirements = {
            length: document.getElementById('reqLength'),
            upper: document.getElementById('reqUpper'),
            number: document.getElementById('reqNumber'),
            special: document.getElementById('reqSpecial')
        };
        
        // Проверка каждого требования
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        // Обновление иконок требований
        requirements.length.classList.toggle('valid', hasMinLength);
        requirements.upper.classList.toggle('valid', hasUpperCase);
        requirements.number.classList.toggle('valid', hasNumbers);
        requirements.special.classList.toggle('valid', hasSpecialChar);
        
        // Расчет силы
        let strength = 0;
        if (hasMinLength) strength++;
        if (hasUpperCase && hasLowerCase) strength++;
        if (hasNumbers) strength++;
        if (hasSpecialChar) strength++;
        
        // Обновление индикатора
        strengthBar.className = 'strength-bar';
        
        if (password.length === 0) {
            strengthBar.style.width = '0%';
            strengthText.textContent = 'Введите пароль';
        } else {
            switch (strength) {
                case 0:
                case 1:
                    strengthBar.style.width = '25%';
                    strengthBar.classList.add('weak');
                    strengthText.textContent = 'Слабый';
                    break;
                case 2:
                    strengthBar.style.width = '50%';
                    strengthBar.classList.add('fair');
                    strengthText.textContent = 'Средний';
                    break;
                case 3:
                    strengthBar.style.width = '75%';
                    strengthBar.classList.add('good');
                    strengthText.textContent = 'Хороший';
                    break;
                case 4:
                    strengthBar.style.width = '100%';
                    strengthBar.classList.add('strong');
                    strengthText.textContent = 'Надежный';
                    break;
            }
        }
    }
    
    // Вспомогательные функции
    function showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
        }
    }
    
    function clearError(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = '';
        }
    }
    
    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    // Анимация появления элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.auth-feature, .benefit').forEach(el => {
        observer.observe(el);
    });
});