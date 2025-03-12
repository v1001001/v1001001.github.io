// 婚礼页面的 JavaScript 功能

// 返回主页
function navigateToHome() {
    // 显示页面过渡动画
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    // 延迟导航以显示过渡效果
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// 结婚纪念日计时器
function updateWeddingClock() {
    const weddingDate = new Date(2021, 11, 30); // 2021年12月30日
    const now = new Date();
    const diff = now - weddingDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('weddingClock').innerHTML =
        days + " 天 " + hours + " 小时 " + minutes + " 分 " + seconds + " 秒";
}

// 庆祝特效 - 落花效果
function celebrateWedding() {
    // 创建花朵类型数组
    const flowers = ['🌸', '🌹', '🌺', '🌷', '🌼', '💐', '🌻'];
    // 创建100个花朵
    for (let i = 0; i < 100; i++) {
        createFallingFlower(flowers, i);
    }
}

function createFallingFlower(flowers, index) {
    // 随机选择一个花朵
    const flower = flowers[Math.floor(Math.random() * flowers.length)];

    // 创建花朵元素
    const flowerEl = document.createElement('div');
    flowerEl.className = 'falling-flower';
    flowerEl.innerHTML = flower;

    // 随机位置
    const left = Math.random() * 100;
    flowerEl.style.left = `${left}%`;

    // 随机大小
    const size = Math.random() * 20 + 15;
    flowerEl.style.fontSize = `${size}px`;

    // 随机旋转
    const rotation = Math.random() * 360;
    flowerEl.style.transform = `rotate(${rotation}deg)`;

    // 随机动画时长 (5-10秒)
    const duration = Math.random() * 5 + 5;
    flowerEl.style.animationDuration = `${duration}s`;

    // 延迟加入以产生更自然的效果
    setTimeout(() => {
        document.body.appendChild(flowerEl);

        // 动画结束后移除
        setTimeout(() => {
            flowerEl.remove();
        }, duration * 1000);
    }, index * 50);
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function () {
    // 添加页面过渡效果
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    // 启动婚礼计时器
    updateWeddingClock();
    setInterval(updateWeddingClock, 1000);

    // 自动播放庆祝特效
    setTimeout(celebrateWedding, 2000);
}); 