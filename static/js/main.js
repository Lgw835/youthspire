// 初始化滚动显示动画
ScrollReveal().reveal('.hero-content', {
    duration: 2000,
    distance: '50px',
    origin: 'bottom',
    opacity: 0
});

ScrollReveal().reveal('.feature-card', {
    duration: 1500,
    interval: 300,
    distance: '30px',
    origin: 'bottom',
    opacity: 0,
    scale: 0.9
});

// GSAP 动画
gsap.from(".nav-brand", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.5
});

gsap.from(".nav-links li", {
    duration: 1,
    y: -50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.8
});

gsap.from(".main-title", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    delay: 0.3
});

gsap.from(".hero-subtitle", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.8
});

// 鼠标移动视差效果
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        const angleX = (mouseY - cardY) / 30;
        const angleY = (mouseX - cardX) / -30;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
});

// 重置卡片位置
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateX(-50%)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translate(-50%, -100%)';
    } else {
        navbar.style.transform = 'translateX(-50%)';
    }
    
    lastScroll = currentScroll;
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 标题动画
function animateTitle() {
    const words = ['创新', '激情', '卓越'];
    const titleElement = document.querySelector('.word-animation');
    let currentIndex = 0;
    let isShowingAll = false;

    function updateText() {
        if (isShowingAll) {
            titleElement.textContent = words.join(' • ');
            setTimeout(() => {
                isShowingAll = false;
                currentIndex = 0;
                updateText();
            }, 3000); // 完整显示停留3秒
        } else {
            // 单个词显示动画
            titleElement.textContent = words[currentIndex];
            currentIndex++;
            
            if (currentIndex >= words.length) {
                isShowingAll = true;
                setTimeout(updateText, 1000); // 最后一个词显示1秒后显示完整标题
            } else {
                setTimeout(updateText, 1000); // 每个词显示1秒
            }
        }
    }

    // 添加淡入淡出效果的CSS
    titleElement.style.transition = 'opacity 0.5s ease-in-out';
    
    // 开始动画
    updateText();
}

// 页面加载完成后启动动画
document.addEventListener('DOMContentLoaded', () => {
    animateTitle();
});

// 添加歌词交互效果
document.addEventListener('DOMContentLoaded', function() {
    const verses = document.querySelectorAll('.verse');
    let lastActiveVerse = null;

    // 监听滚动事件
    const lyricsScroll = document.querySelector('.lyrics-scroll');
    lyricsScroll.addEventListener('scroll', function() {
        const scrollPosition = lyricsScroll.scrollTop;
        
        verses.forEach(verse => {
            const versePosition = verse.offsetTop - lyricsScroll.offsetTop;
            const verseHeight = verse.offsetHeight;
            
            // 判断歌词是否在视窗中心位置
            if (versePosition < (lyricsScroll.clientHeight / 2) && 
                (versePosition + verseHeight) > (lyricsScroll.clientHeight / 2)) {
                if (lastActiveVerse !== verse) {
                    if (lastActiveVerse) {
                        lastActiveVerse.classList.remove('active');
                    }
                    verse.classList.add('active');
                    lastActiveVerse = verse;
                }
            }
        });
    });

    // 鼠标悬停效果
    verses.forEach(verse => {
        verse.addEventListener('mouseenter', function() {
            if (lastActiveVerse && lastActiveVerse !== verse) {
                lastActiveVerse.classList.remove('active');
            }
        });

        verse.addEventListener('mouseleave', function() {
            if (lastActiveVerse && lastActiveVerse !== verse) {
                lastActiveVerse.classList.add('active');
            }
        });
    });
});

// 展开阅读功能
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const fullText = document.querySelector('.full-text');
    const previewText = document.querySelector('.preview-text');
    const btnText = readMoreBtn.querySelector('span');
    
    readMoreBtn.addEventListener('click', function() {
        fullText.classList.toggle('hidden');
        previewText.style.display = fullText.classList.contains('hidden') ? 'block' : 'none';
        readMoreBtn.classList.toggle('expanded');
        btnText.textContent = fullText.classList.contains('hidden') ? '展开阅读' : '收起内容';
    });
});

// 模态框功能
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreBtn = document.querySelector('.learn-more-btn');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const closeBtn = document.querySelector('.close-btn');
    const returnBtn = document.querySelector('.return-btn');
    
    function openModal() {
        modalBackdrop.classList.remove('hidden');
        setTimeout(() => {
            modalBackdrop.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modalBackdrop.classList.remove('active');
        setTimeout(() => {
            modalBackdrop.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }
    
    learnMoreBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    returnBtn.addEventListener('click', closeModal);
    
    // 点击背景关闭模态框
    modalBackdrop.addEventListener('click', function(e) {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
            closeModal();
        }
    });
}); 