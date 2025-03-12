// 点击文字产生爱心特效
function createHeartAtClick(event) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.style.left = (event.pageX - 10) + 'px';
    heart.style.top = (event.pageY - 10) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// 音乐控制 - 默认播放，无需按钮控制
function setupAutoPlayMusic() {
    const audio = document.querySelector('embed');
    // 确保音乐始终可见（播放）
    if (audio) {
        audio.style.display = 'block';
    }
}

// 背景颜色切换
const colors = [
    'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
    'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)'
];
let currentColorIndex = 0;
let colorChangeInterval;

function changeBackground(random = true) {
    if (random) {
        // 随机选择一个不同于当前背景的颜色
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * colors.length);
        } while (newIndex === currentColorIndex);

        currentColorIndex = newIndex;
    } else {
        // 顺序循环切换
        currentColorIndex = (currentColorIndex + 1) % colors.length;
    }

    document.body.style.background = colors[currentColorIndex];
}

// 开始自动随机切换背景颜色
function startRandomBackgroundChange() {
    // 先立即改变一次颜色
    changeBackground(true);

    // 每30秒随机切换一次背景颜色
    colorChangeInterval = setInterval(() => {
        changeBackground(true);
    }, 30000);
}

// 发送祝福气泡
function createBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'blessing-bubble';

    // 随机选择气泡形状：语音泡泡、云朵或气球
    const bubbleTypes = ['bubble-speech', 'bubble-cloud', 'bubble-balloon'];
    const bubbleType = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
    bubble.classList.add(bubbleType);

    // 设置文本内容
    bubble.textContent = text;

    // 随机左右位置，考虑窗口大小和气泡类型
    let margin = 150;
    if (bubbleType === 'bubble-cloud') margin = 180; // 云朵更宽
    bubble.style.left = Math.random() * (window.innerWidth - margin) + 'px';

    // 随机添加动画延迟，让气泡出现更自然
    const animationDelay = Math.random() * 0.5;
    bubble.style.animationDelay = animationDelay + 's';

    // 为气球设置特殊的上升动画
    if (bubbleType === 'bubble-balloon') {
        bubble.style.animation = 'float-balloon 5s ease-in-out';
    }

    // 随机大小 (90%-110%)
    const scale = 0.9 + Math.random() * 0.2;
    bubble.style.transform = `scale(${scale})`;

    // 添加装饰物（仅对语音气泡）
    if (bubbleType === 'bubble-speech') {
        const decoration = document.createElement('span');
        decoration.className = 'decoration';

        // 随机选择装饰物
        const decoTypes = ['deco-1', 'deco-2', 'deco-3'];
        const decoType = decoTypes[Math.floor(Math.random() * decoTypes.length)];
        decoration.classList.add(decoType);

        // 设置装饰内容
        if (decoType === 'deco-1') decoration.textContent = '❤️';
        else if (decoType === 'deco-2') decoration.textContent = '✨';
        else decoration.textContent = '🌟';

        bubble.appendChild(decoration);
    }

    // 添加鼠标悬停动画
    bubble.addEventListener('mouseover', () => {
        if (!bubble.classList.contains('removing')) {
            bubble.style.animation = 'bubble-bounce 0.5s ease-in-out';
            setTimeout(() => {
                if (bubble && document.body.contains(bubble)) {
                    if (bubbleType === 'bubble-balloon') {
                        bubble.style.animation = 'float-balloon 5s ease-in-out';
                    } else {
                        bubble.style.animation = 'float-bubble 4s ease-in-out';
                    }
                    bubble.style.animationPlayState = 'running';
                    bubble.style.animationDelay = '0s';
                }
            }, 500);
        }
    });

    document.body.appendChild(bubble);

    // 动画结束后移除元素
    const duration = bubbleType === 'bubble-balloon' ? 5000 : 4000; // 气球上升时间更长
    setTimeout(() => {
        if (bubble && document.body.contains(bubble)) {
            bubble.classList.add('removing');
            bubble.style.opacity = '0';
            setTimeout(() => bubble.remove(), 500);
        }
    }, duration + animationDelay * 1000);
}

const blessings = [
    '永远爱你 ❤️',
    '一起走下去',
    '最美的遇见',
    '最好的时光',
    '最甜的恋爱',
    '愿得一人心',
    '白首不相离',
    '执子之手',
    '与子偕老',
    '爱你一万年',
    '携手共度余生',
    '爱你每一天',
    '心有灵犀',
    '比心 💕',
    '甜蜜每一刻',
    '今生挚爱',
    '我的唯一',
    '一生守护你',
    '命中注定',
    '幸福永远'
];

function sendRandomBlessing() {
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    createBubble(randomBlessing);

    // 安排下一次随机祝福，时间间隔在3秒到10秒之间随机
    const nextInterval = Math.floor(Math.random() * 7000) + 3000;
    setTimeout(sendRandomBlessing, nextInterval);
}

// 开始自动祝福功能
function startRandomBlessings() {
    // 先立即显示一个祝福
    sendRandomBlessing();

    // 初始设置一个稍长的间隔，后续的间隔会由sendRandomBlessing函数自己安排
    setTimeout(() => {
        // 每隔一段时间冒出一组祝福（2-4个连续的祝福）
        const burstInterval = Math.floor(Math.random() * 30000) + 15000; // 15-45秒

        const burstBlessings = () => {
            const count = Math.floor(Math.random() * 3) + 2; // 2-4个祝福
            let i = 0;

            const sendBurst = () => {
                if (i < count) {
                    // 确保不重复的祝福
                    let randomIndex, lastIndex = -1;
                    do {
                        randomIndex = Math.floor(Math.random() * blessings.length);
                    } while (randomIndex === lastIndex);
                    lastIndex = randomIndex;

                    const randomBlessing = blessings[randomIndex];
                    createBubble(randomBlessing);
                    i++;
                    setTimeout(sendBurst, Math.floor(Math.random() * 800) + 400); // 0.4-1.2秒间隔
                }
            };

            sendBurst();
            setTimeout(burstBlessings, burstInterval);
        };

        burstBlessings();
    }, 8000); // 初始延迟8秒
}

// 结婚特效功能已被移除
function createWeddingEffect() {
    // 此功能已被移除
    return;
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

// 滑动导航功能增强
let transitionType = 'door'; // 默认使用开门过渡效果，可以是 'door', 'curtain', 'flip', 'carousel', 'circle', 'fan'
const transitionEffects = ['door', 'curtain', 'flip', 'carousel', 'circle', 'fan'];
let transitionChangeInterval;

// 自动随机切换过渡效果
function startRandomTransitionChange() {
    // 随机选择新的过渡效果，不同于当前效果
    function changeTransitionEffect() {
        const currentIndex = transitionEffects.indexOf(transitionType);
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * transitionEffects.length);
        } while (newIndex === currentIndex);

        transitionType = transitionEffects[newIndex];

        const effectNames = {
            'door': '开门效果',
            'curtain': '卷帘效果',
            'flip': '翻页效果',
            'carousel': '旋转木马效果',
            'circle': '圆心散开效果',
            'fan': '扇叶散开效果'
        };

        // 显示切换消息
        const message = document.createElement('div');
        message.className = 'transition-message';
        message.textContent = `过渡效果已切换为: ${effectNames[transitionType]}`;
        document.body.appendChild(message);

        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        }, 1500);

        // 短暂预览新效果
        previewTransitionEffect(transitionType);
    }

    // 立即切换一次过渡效果
    setTimeout(() => {
        changeTransitionEffect();

        // 每60-120秒随机切换过渡效果
        transitionChangeInterval = setInterval(() => {
            changeTransitionEffect();
        }, Math.floor(Math.random() * 60000) + 60000);
    }, 30000); // 页面加载30秒后开始
}

// 原有的toggleTransitionType函数不再由按钮调用，保留用于内部使用
function toggleTransitionType() {
    // 循环切换效果
    const currentIndex = transitionEffects.indexOf(transitionType);
    const nextIndex = (currentIndex + 1) % transitionEffects.length;
    transitionType = transitionEffects[nextIndex];

    const effectNames = {
        'door': '开门效果',
        'curtain': '卷帘效果',
        'flip': '翻页效果',
        'carousel': '旋转木马效果',
        'circle': '圆心散开效果',
        'fan': '扇叶散开效果'
    };

    const message = document.createElement('div');
    message.className = 'transition-message';
    message.textContent = `过渡效果已切换为: ${effectNames[transitionType]}`;
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 1500);

    // 预览效果
    previewTransitionEffect(transitionType);
}

// 创建圆心型散开效果
function createCircleTransition() {
    const circleTransition = document.createElement('div');
    circleTransition.className = 'circle-transition';

    // 创建多个散开的圆形元素
    const count = 10; // 粒子数量
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'circle-particle';
        // 随机设置每个粒子的初始位置，使它们从中心向外散开
        particle.style.transform = `rotate(${i * (360 / count)}deg)`;

        // 添加爱心元素
        const heart = document.createElement('div');
        heart.className = 'circle-heart';
        heart.innerHTML = '❤️';
        particle.appendChild(heart);

        circleTransition.appendChild(particle);
    }

    return circleTransition;
}

// 创建扇叶型散开效果
function createFanTransition() {
    const fanTransition = document.createElement('div');
    fanTransition.className = 'fan-transition';

    // 创建多个扇叶
    const count = 8; // 扇叶数量
    for (let i = 0; i < count; i++) {
        const blade = document.createElement('div');
        blade.className = 'fan-blade';
        const rotation = i * (360 / count);
        blade.style.setProperty('--rotate', `${rotation}deg`);

        fanTransition.appendChild(blade);
    }

    // 添加中心点装饰
    const center = document.createElement('div');
    center.className = 'fan-center';
    center.innerHTML = '💕';
    fanTransition.appendChild(center);

    return fanTransition;
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
    } else if (effect === 'circle') {
        transition = createCircleTransition();
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.classList.add('circle-open');

            setTimeout(() => {
                transition.classList.remove('circle-open');
                transition.classList.add('circle-close');

                setTimeout(() => {
                    transition.remove();
                }, 1000);
            }, 500);
        }, 50);
    } else if (effect === 'fan') {
        transition = createFanTransition();
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.classList.add('fan-open');

            setTimeout(() => {
                transition.classList.remove('fan-open');
                transition.classList.add('fan-close');

                setTimeout(() => {
                    transition.remove();
                }, 1000);
            }, 500);
        }, 50);
    }
}

// 处理导航到婚礼页面的事件 - 改为鼠标事件触发
function setupNavigation() {
    // 监听双击事件
    document.addEventListener('dblclick', (e) => {
        navigateToWeddingPage();
    });

    // 监听右键单击事件
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // 阻止右键菜单显示
        navigateToWeddingPage();
    });

    // 为用户添加提示
    setTimeout(() => {
        const clickHint = document.createElement('div');
        clickHint.className = 'click-hint';
        clickHint.innerHTML = '💡 双击或右键查看婚礼页面';
        document.body.appendChild(clickHint);

        setTimeout(() => {
            clickHint.style.opacity = '0';
            setTimeout(() => clickHint.remove(), 1000);
        }, 5000);
    }, 2000);
}

// 通用函数：随机选择过渡效果并创建过渡
function createRandomTransition() {
    // 随机选择一种过渡效果
    const randomEffectIndex = Math.floor(Math.random() * transitionEffects.length);
    transitionType = transitionEffects[randomEffectIndex];

    // 显示当前使用的过渡效果
    const effectNames = {
        'door': '开门效果',
        'curtain': '卷帘效果',
        'flip': '翻页效果',
        'carousel': '旋转木马效果',
        'circle': '圆心散开效果',
        'fan': '扇叶散开效果'
    };

    const message = document.createElement('div');
    message.className = 'transition-message';
    message.textContent = `正在使用: ${effectNames[transitionType]}`;
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 800);

    let transition;

    // 创建过渡效果
    if (transitionType === 'door') {
        transition = createDoorTransition();
    } else if (transitionType === 'curtain') {
        transition = createCurtainTransition();
    } else if (transitionType === 'flip') {
        transition = createFlipTransition();
    } else if (transitionType === 'carousel') {
        transition = createCarouselTransition();
    } else if (transitionType === 'circle') {
        transition = createCircleTransition();
    } else if (transitionType === 'fan') {
        transition = createFanTransition();
    }

    document.body.appendChild(transition);

    // 激活过渡效果
    setTimeout(() => {
        if (transitionType === 'door') {
            transition.classList.add('door-open');
        } else if (transitionType === 'curtain') {
            transition.classList.add('curtain-open');
        } else if (transitionType === 'flip') {
            transition.classList.add('flip-open');
        } else if (transitionType === 'carousel') {
            transition.classList.add('carousel-open');
        } else if (transitionType === 'circle') {
            transition.classList.add('circle-open');
        } else if (transitionType === 'fan') {
            transition.classList.add('fan-open');
        }
    }, 50);

    return transition;
}

function navigateToWeddingPage() {
    // 创建随机过渡效果
    createRandomTransition();

    // 延迟导航以显示过渡效果
    setTimeout(() => {
        window.location.href = 'wedding.html?effect=' + transitionType;
    }, 1200);
}

// 处理返回首页导航
function navigateToHome() {
    // 创建随机过渡效果
    createRandomTransition();

    // 延迟导航以显示过渡效果
    setTimeout(() => {
        window.location.href = 'index.html?effect=' + transitionType;
    }, 1200);
}

// 初始化交互功能
document.addEventListener('DOMContentLoaded', () => {
    // 获取URL参数中的过渡效果设置
    const urlParams = new URLSearchParams(window.location.search);
    const urlEffect = urlParams.get('effect');
    if (urlEffect) {
        transitionType = urlEffect;
    }

    // 原有的初始化代码
    document.getElementById('code').addEventListener('click', createHeartAtClick);

    // 开启自动随机祝福 (替代原来的固定间隔和按钮)
    startRandomBlessings();

    // 开始随机背景颜色切换，替代原来的背景色按钮
    startRandomBackgroundChange();

    // 设置音乐自动播放
    setupAutoPlayMusic();

    // 启动自动随机切换过渡效果（替代原来的切换按钮）
    startRandomTransitionChange();

    // 设置鼠标导航功能
    setupNavigation();

    // 移除了结婚特效的自动触发

    // 测试门效果
    if (window.location.href.includes('testDoor=true')) {
        setTimeout(testDoorEffect, 1000);
    }
});

// 仅用于测试的门效果函数
function testDoorEffect() {
    // 显示测试消息
    const message = document.createElement('div');
    message.className = 'transition-message';
    message.textContent = '测试中: 开门效果';
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 1500);

    // 创建门效果
    const doorTransition = createDoorTransition();
    document.body.appendChild(doorTransition);

    // 打开门
    setTimeout(() => {
        doorTransition.classList.add('door-open');

        // 3秒后关闭门
        setTimeout(() => {
            doorTransition.classList.remove('door-open');
            doorTransition.classList.add('door-close');

            // 动画结束后移除
            setTimeout(() => {
                doorTransition.remove();

                // 显示测试完成消息
                const completeMsg = document.createElement('div');
                completeMsg.className = 'transition-message';
                completeMsg.textContent = '开门效果测试完成';
                document.body.appendChild(completeMsg);

                setTimeout(() => {
                    completeMsg.style.opacity = '0';
                    setTimeout(() => completeMsg.remove(), 500);
                }, 1500);

            }, 1000);
        }, 3000);
    }, 100);
} 