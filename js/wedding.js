// 婚礼页面的 JavaScript 功能

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

// 返回主页
function navigateToHome() {
    // 获取URL参数以确定使用什么过渡效果
    const urlParams = new URLSearchParams(window.location.search);
    const effect = urlParams.get('effect') || 'door';

    let transition;

    if (effect === 'door') {
        transition = createDoorTransition();
        transition.classList.add('door-open');
        document.body.appendChild(transition);

        // 给过渡元素时间渲染
        setTimeout(() => {
            transition.classList.remove('door-open');
            transition.classList.add('door-close');
        }, 50);
    } else {
        transition = createCurtainTransition();
        transition.classList.add('curtain-open');
        document.body.appendChild(transition);

        // 给过渡元素时间渲染
        setTimeout(() => {
            transition.classList.remove('curtain-open');
            transition.classList.add('curtain-close');
        }, 50);
    }

    // 延迟导航以显示过渡效果
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
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

// 庆祝特效 - 加强版落花效果
function celebrateWedding() {
    // 创建花朵类型数组
    const flowers = ['🌸', '🌹', '🌺', '🌷', '🌼', '💐', '🌻'];
    // 创建100个花朵
    for (let i = 0; i < 100; i++) {
        createFallingFlower(flowers, i);
    }

    // 添加心跳效果到所有主要内容
    const elements = document.querySelectorAll('.wedding-title, .wedding-date, .wedding-photos, .wedding-vows, .anniversary');
    elements.forEach(el => {
        el.classList.add('entrance-effect');
        setTimeout(() => el.classList.remove('entrance-effect'), 1500);
    });
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
    flowerEl.style.animationDuration = `${duration}s, 2s`;

    // 延迟加入以产生更自然的效果
    setTimeout(() => {
        document.body.appendChild(flowerEl);

        // 动画结束后移除
        setTimeout(() => {
            flowerEl.remove();
        }, duration * 1000);
    }, index * 50);
}

// 播放进入动画
function playEntranceAnimation() {
    // 获取URL参数以确定使用什么过渡效果
    const urlParams = new URLSearchParams(window.location.search);
    const effect = urlParams.get('effect') || 'door';

    let transition;

    if (effect === 'door') {
        transition = createDoorTransition();
        document.body.appendChild(transition);
        transition.classList.add('door-close');

        // 给浏览器一些时间进行渲染
        setTimeout(() => {
            transition.classList.remove('door-close');
            transition.classList.add('door-open');

            // 动画完成后移除
            setTimeout(() => {
                transition.remove();
            }, 1000);
        }, 50);
    } else {
        transition = createCurtainTransition();
        document.body.appendChild(transition);

        // 给浏览器一些时间进行渲染
        setTimeout(() => {
            transition.classList.add('curtain-open');

            // 动画完成后移除
            setTimeout(() => {
                transition.remove();
            }, 1000);
        }, 50);
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function () {
    // 播放进入动画
    playEntranceAnimation();

    // 启动婚礼计时器
    updateWeddingClock();
    setInterval(updateWeddingClock, 1000);

    // 设置所有内容元素的初始不透明度
    const contentElements = document.querySelectorAll('.wedding-container > *');
    contentElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
        el.style.transitionDelay = `${1 + index * 0.1}s`;

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 50);
    });

    // 自动播放庆祝特效
    setTimeout(celebrateWedding, 2500);
}); 