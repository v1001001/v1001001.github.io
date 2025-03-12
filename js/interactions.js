// 点击文字产生爱心特效
function createHeartAtClick(event) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.style.left = (event.pageX - 10) + 'px';
    heart.style.top = (event.pageY - 10) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// 音乐控制
function toggleMusic() {
    const audio = document.querySelector('embed');
    if (audio.style.display === 'none') {
        audio.style.display = 'block';
        document.getElementById('musicControl').innerHTML = '🔊';
    } else {
        audio.style.display = 'none';
        document.getElementById('musicControl').innerHTML = '🔈';
    }
}

// 背景颜色切换
const colors = [
    'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
    'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)'
];
let currentColorIndex = 0;

function changeBackground() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    document.body.style.background = colors[currentColorIndex];
}

// 发送祝福气泡
function createBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'blessing-bubble';
    bubble.textContent = text;
    bubble.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 4000);
}

const blessings = [
    '永远爱你 ❤️',
    '一起走下去',
    '最美的遇见',
    '最好的时光',
    '最甜的恋爱'
];

function sendRandomBlessing() {
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    createBubble(randomBlessing);
}

// 结婚特效
function createWeddingEffect() {
    const container = document.createElement('div');
    container.className = 'wedding-effect';

    // 创建新郎新娘
    const couple = document.createElement('div');
    couple.className = 'couple';
    couple.innerHTML = `
        <div class="groom">🤵</div>
        <div class="bride">👰</div>
    `;

    // 创建花朵
    const flowers = document.createElement('div');
    flowers.className = 'flowers';
    flowers.innerHTML = `
        <div class="flower">🌹</div>
        <div class="flower">🌸</div>
        <div class="flower">💐</div>
    `;

    container.appendChild(couple);
    container.appendChild(flowers);
    document.body.appendChild(container);

    // 添加动画结束后移除特效
    setTimeout(() => container.remove(), 5000);
}

// 滑动导航功能
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    // 检测左滑动作 (从右向左滑)
    if (touchStartX - touchEndX > 100) {
        // 左滑，前往结婚页面
        navigateToWeddingPage();
    }
}

function navigateToWeddingPage() {
    // 显示页面过渡动画
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    // 延迟导航以显示过渡效果
    setTimeout(() => {
        window.location.href = 'wedding.html';
    }, 500);
}

// 初始化交互功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加点击爱心效果
    document.getElementById('code').addEventListener('click', createHeartAtClick);

    // 每30秒自动发送一个祝福气泡
    setInterval(sendRandomBlessing, 30000);

    // 初始化背景色
    document.body.style.background = colors[0];

    // 添加结婚特效按钮
    const weddingBtn = document.createElement('button');
    weddingBtn.className = 'control-btn';
    weddingBtn.innerHTML = '💑';
    weddingBtn.onclick = createWeddingEffect;
    document.querySelector('.control-panel').appendChild(weddingBtn);

    // 添加导航按钮
    const navBtn = document.createElement('button');
    navBtn.className = 'control-btn';
    navBtn.innerHTML = '👉';
    navBtn.onclick = navigateToWeddingPage;
    navBtn.title = "查看我们的婚礼";
    document.querySelector('.control-panel').appendChild(navBtn);

    // 添加滑动检测
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // 为移动设备添加提示
    if ('ontouchstart' in window) {
        setTimeout(() => {
            const swipeHint = document.createElement('div');
            swipeHint.className = 'swipe-hint';
            swipeHint.innerHTML = '👈 向左滑动查看婚礼页面';
            document.body.appendChild(swipeHint);

            setTimeout(() => {
                swipeHint.style.opacity = '0';
                setTimeout(() => swipeHint.remove(), 1000);
            }, 3000);
        }, 2000);
    }
}); 