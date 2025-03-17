document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('i');
    
    // التحقق من الوضع المحفوظ مسبقاً
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', function() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            // التحويل للوضع الفاتح
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'false');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            // التحويل للوضع الداكن
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'true');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });
});
