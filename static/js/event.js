document.addEventListener('DOMContentLoaded', function() {
    // 初始化 ScrollReveal
    ScrollReveal().reveal('.event-card', {
        delay: 200,
        distance: '20px',
        origin: 'bottom',
        interval: 100
    });

    // 活动筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            eventCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // 添加动画效果
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 报名按钮点击效果
    const signupButtons = document.querySelectorAll('.btn.primary');
    signupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加点击波纹效果
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// 添加页面载入动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 改进的滚动动画
function checkScroll() {
    const cards = document.querySelectorAll('.event-card');
    const triggerBottom = window.innerHeight * 0.8;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardBottom = card.getBoundingClientRect().bottom;

        if (cardTop < triggerBottom && cardBottom > 0) {
            card.classList.add('animate');
        }
    });
}

// 初始检查
document.addEventListener('DOMContentLoaded', () => {
    // 立即触发一次检查，确保首屏内容显示
    checkScroll();
    
    // 添加滚动事件监听
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}); 