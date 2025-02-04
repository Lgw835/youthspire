document.addEventListener('DOMContentLoaded', function() {
    // 添加鼠标悬停效果
    const cards = document.querySelectorAll('.social-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}); 