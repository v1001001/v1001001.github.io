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

// 创建3D翻页效果
function createFlipTransition() {
    const flipTransition = document.createElement('div');
    flipTransition.className = 'flip-transition';

    const flipPage = document.createElement('div');
    flipPage.className = 'flip-page';

    flipTransition.appendChild(flipPage);

    return flipTransition;
}

// 创建旋转木马效果
function createCarouselTransition() {
    const carouselTransition = document.createElement('div');
    carouselTransition.className = 'carousel-transition';

    const container = document.createElement('div');
    container.className = 'carousel-container';

    // 旋转木马的6个面
    const emojis = ['👰', '🤵', '💍', '💐', '🎂', '💝'];
    for (let i = 0; i < 6; i++) {
        const face = document.createElement('div');
        face.className = `carousel-face carousel-face-${i + 1}`;
        face.innerHTML = emojis[i];
        container.appendChild(face);
    }

    carouselTransition.appendChild(container);

    return carouselTransition;
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
    } else if (effect === 'curtain') {
        transition = createCurtainTransition();
        transition.classList.add('curtain-open');
        document.body.appendChild(transition);

        // 给过渡元素时间渲染
        setTimeout(() => {
            transition.classList.remove('curtain-open');
            transition.classList.add('curtain-close');
        }, 50);
    } else if (effect === 'flip') {
        transition = createFlipTransition();
        transition.classList.add('flip-open');
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.classList.remove('flip-open');
            transition.classList.add('flip-close');
        }, 50);
    } else if (effect === 'carousel') {
        transition = createCarouselTransition();
        transition.classList.add('carousel-open');
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.classList.remove('carousel-open');
            transition.classList.add('carousel-close');
        }, 50);
    }

    // 延迟导航以显示过渡效果
    setTimeout(() => {
        window.location.href = 'index.html?effect=' + effect;
    }, 1200);
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
            }, 1200);
        }, 50);
    } else if (effect === 'curtain') {
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
    } else if (effect === 'flip') {
        transition = createFlipTransition();
        document.body.appendChild(transition);
        transition.classList.add('flip-close');

        setTimeout(() => {
            transition.classList.remove('flip-close');
            transition.classList.add('flip-open');

            setTimeout(() => {
                transition.remove();
            }, 1500);
        }, 50);
    } else if (effect === 'carousel') {
        transition = createCarouselTransition();
        document.body.appendChild(transition);
        transition.classList.add('carousel-close');

        setTimeout(() => {
            transition.classList.remove('carousel-close');
            transition.classList.add('carousel-open');

            setTimeout(() => {
                transition.remove();
            }, 1500);
        }, 50);
    }
}

// 添加滑动导航
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function handleWeddingSwipe() {
    const xDiff = touchStartX - touchEndX;
    const yDiff = touchStartY - touchEndY;

    // 确保是水平滑动而不是垂直滑动
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 80) {
        // 检测右滑动作 (从左向右滑)
        if (xDiff < 0) {
            // 右滑，前往主页
            navigateToHome();
        }
    }
}

// 切换过渡效果类型
function cycleTransitionEffect() {
    // 获取URL参数以确定当前使用的过渡效果
    const urlParams = new URLSearchParams(window.location.search);
    let effect = urlParams.get('effect') || 'door';

    // 循环切换效果
    const effects = ['door', 'curtain', 'flip', 'carousel'];
    const currentIndex = effects.indexOf(effect);
    const nextIndex = (currentIndex + 1) % effects.length;
    effect = effects[nextIndex];

    // 更新URL以保存效果设置
    const url = new URL(window.location);
    url.searchParams.set('effect', effect);
    window.history.replaceState({}, '', url);

    // 显示效果已更改的消息
    const message = document.createElement('div');
    message.className = 'transition-message';

    const effectNames = {
        'door': '开门效果',
        'curtain': '卷帘效果',
        'flip': '翻页效果',
        'carousel': '旋转木马效果'
    };

    message.textContent = `过渡效果已切换为: ${effectNames[effect]}`;
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 1500);

    // 预览效果
    previewTransitionEffect(effect);
}

// 预览过渡效果
function previewTransitionEffect(effect) {
    let transition;

    if (effect === 'door') {
        transition = createDoorTransition();
        document.body.appendChild(transition);

        // 快速打开后关闭
        setTimeout(() => {
            transition.classList.add('door-open');

            setTimeout(() => {
                transition.classList.remove('door-open');
                transition.classList.add('door-close');

                setTimeout(() => {
                    transition.remove();
                }, 1000);
            }, 500);
        }, 50);
    } else if (effect === 'curtain') {
        transition = createCurtainTransition();
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.classList.add('curtain-open');

            setTimeout(() => {
                transition.classList.remove('curtain-open');
                transition.classList.add('curtain-close');

                setTimeout(() => {
                    transition.remove();
                }, 1000);
            }, 500);
        }, 50);
    } else if (effect === 'flip') {
        transition = createFlipTransition();
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.classList.add('flip-open');

            setTimeout(() => {
                transition.classList.remove('flip-open');
                transition.classList.add('flip-close');

                setTimeout(() => {
                    transition.remove();
                }, 1000);
            }, 500);
        }, 50);
    } else if (effect === 'carousel') {
        transition = createCarouselTransition();
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.classList.add('carousel-open');

            setTimeout(() => {
                transition.classList.remove('carousel-open');
                transition.classList.add('carousel-close');

                setTimeout(() => {
                    transition.remove();
                }, 1000);
            }, 500);
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

    // 添加滑动检测
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleWeddingSwipe();
    });

    // 添加效果切换按钮
    const effectBtn = document.createElement('button');
    effectBtn.className = 'control-btn effect-btn';
    effectBtn.innerHTML = '🔄';
    effectBtn.title = '切换过渡效果';
    effectBtn.onclick = cycleTransitionEffect;
    document.body.appendChild(effectBtn);

    // 自动播放庆祝特效
    setTimeout(celebrateWedding, 2500);

    // 为移动设备添加提示
    if ('ontouchstart' in window) {
        setTimeout(() => {
            const swipeHint = document.createElement('div');
            swipeHint.className = 'swipe-hint';
            swipeHint.innerHTML = '👉 向右滑动返回主页';
            document.body.appendChild(swipeHint);

            setTimeout(() => {
                swipeHint.style.opacity = '0';
                setTimeout(() => swipeHint.remove(), 1000);
            }, 3000);
        }, 3500);
    }
}); 