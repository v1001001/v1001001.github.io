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

// 创建开门过渡效果
function createDoorTransition() {
    const doorTransition = document.createElement('div');
    doorTransition.className = 'door-transition';

    const doorLeft = document.createElement('div');
    doorLeft.className = 'door-left';

    const doorRight = document.createElement('div');
    doorRight.className = 'door-right';

    doorTransition.appendChild(doorLeft);
    doorTransition.appendChild(doorRight);

    return doorTransition;
}

// 创建卷帘过渡效果
function createCurtainTransition() {
    const curtainTransition = document.createElement('div');
    curtainTransition.className = 'curtain-transition';

    // 创建10个卷帘面板
    for (let i = 0; i < 10; i++) {
        const panel = document.createElement('div');
        panel.className = 'curtain-panel';
        curtainTransition.appendChild(panel);
    }

    return curtainTransition;
}

// 滑动导航功能增强
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let transitionType = 'door'; // 默认使用开门过渡效果，可以是 'door' 或 'curtain'

function toggleTransitionType() {
    transitionType = transitionType === 'door' ? 'curtain' : 'door';
    const message = document.createElement('div');
    message.className = 'transition-message';
    message.textContent = `过渡效果已切换为: ${transitionType === 'door' ? '开门效果' : '卷帘效果'}`;
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 1500);
}

function handleSwipe() {
    // 计算水平和垂直滑动距离
    const xDiff = touchStartX - touchEndX;
    const yDiff = touchStartY - touchEndY;

    // 确保是水平滑动而不是垂直滑动
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 100) {
        // 检测左滑动作 (从右向左滑)
        if (xDiff > 0) {
            // 左滑，前往结婚页面
            navigateToWeddingPage();
        }
    }
}

function navigateToWeddingPage() {
    let transition;

    // 根据当前设置的过渡类型创建过渡效果
    if (transitionType === 'door') {
        transition = createDoorTransition();
        document.body.appendChild(transition);

        // 给浏览器一些时间进行渲染
        setTimeout(() => {
            transition.classList.add('door-open');
        }, 50);
    } else {
        transition = createCurtainTransition();
        document.body.appendChild(transition);

        // 给浏览器一些时间进行渲染
        setTimeout(() => {
            transition.classList.add('curtain-open');
        }, 50);
    }

    // 延迟导航以显示过渡效果
    setTimeout(() => {
        window.location.href = 'wedding.html?effect=' + transitionType;
    }, 1000);
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

    // 添加效果切换按钮
    const effectBtn = document.createElement('button');
    effectBtn.className = 'control-btn';
    effectBtn.innerHTML = '🔄';
    effectBtn.onclick = toggleTransitionType;
    effectBtn.title = "切换过渡效果";
    document.querySelector('.control-panel').appendChild(effectBtn);

    // 增强滑动检测
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
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