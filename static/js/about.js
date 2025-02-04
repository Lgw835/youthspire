// 统一管理所有观察者
const observers = {
    timeline: null,
    valueCards: null,
    numbers: null
};

// 初始化滚动显示动画
function initScrollReveal() {
    ScrollReveal().reveal('.about-content', {
        duration: 2000,
        distance: '50px',
        origin: 'bottom',
        opacity: 0
    });

    ScrollReveal().reveal('.value-card', {
        duration: 1500,
        interval: 200,
        distance: '30px',
        origin: 'bottom',
        opacity: 0,
        scale: 0.9
    });

    ScrollReveal().reveal('.member-card', {
        duration: 1500,
        interval: 300,
        distance: '30px',
        origin: 'bottom',
        opacity: 0
    });

    ScrollReveal().reveal('.timeline-item', {
        duration: 1500,
        interval: 400,
        distance: '50px',
        origin: 'left',
        opacity: 0
    });
}

// 初始化 GSAP 动画
function initGSAPAnimations() {
    gsap.from(".hero-title", {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power4.out"
    });

    gsap.from(".hero-subtitle", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
    });
}

// 数字计数动画
function initCounterAnimation() {
    let animated = false;
    const numbersShowcase = document.querySelector('.numbers-showcase');

    if (numbersShowcase) {
        observers.numbers = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    document.querySelectorAll('.counter').forEach(counter => {
                        animateCounter(counter, parseInt(counter.parentElement.dataset.target));
                    });
                    animated = true;
                }
            });
        }, { threshold: 0.5 });

        observers.numbers.observe(numbersShowcase);
    }
}

// 添加滚动进度指示器
function addScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 导航栏滚动效果优化
function enhanceNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled', 'scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initGSAPAnimations();
    initCounterAnimation();
    addScrollProgressIndicator();
    enhanceNavbar();
}); 