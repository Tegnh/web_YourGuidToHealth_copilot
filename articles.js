document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            articles.forEach(article => {
                if (category === 'all' || article.dataset.category === category) {
                    article.style.display = 'block';
                    article.style.animation = 'fadeIn 0.5s ease';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });

    // تحديث وظيفة التحقق من وجود الصفحة
    const validArticles = [
        'nutrition-basics.html',
        'start-fitness.html',
        'vegetables-benefits.html',
        'healthy-sleep.html',
        'mental-health.html',
        'plant-protein.html',
        'cardio-exercises.html'
    ];

    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const articleFile = href.split('/').pop();
            
            if (!validArticles.includes(articleFile)) {
                e.preventDefault();
                alert('المقال قيد الإنشاء، سيتم إضافته قريباً');
            }
        });
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
