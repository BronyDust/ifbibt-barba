import barba from '@barba/core';
import gsap, {Power2} from 'gsap';
import './content.css';
import './nav.css';
import './styles.css';
import './footer.css';

function closeMenuOnAnyClick() {
    const nav = document.querySelector('.global-mobile-nav-items');
    const openTrigger = document.getElementById('openmobile');
    nav.onclick = () => {
        openTrigger.checked = false;
    };
}

let blockScrollHandling = false;
let parallaxBlock = null;

function scrollParallaxHandler() {
    if (blockScrollHandling) return;
    blockScrollHandling = true;

    const scrolledPercent = Math.floor(window.pageYOffset / (document.body.scrollHeight - document.documentElement.clientHeight) * 100);
    const availableHeight = Math.floor(parallaxBlock.offsetHeight * .3);

    gsap.to(parallaxBlock, .5, {scale: 1.3, y: availableHeight / 100 * scrolledPercent});
    setTimeout(() => {
        blockScrollHandling = false;
    }, 100);
}

function initParallax() {
    if (!parallaxBlock) return;
    parallaxBlock.style.transformOrigin = 'top';
    parallaxBlock.style.transform = 'scale(1.5)';

    window.addEventListener('scroll', scrollParallaxHandler);
    window.addEventListener('resize', scrollParallaxHandler);
}

document.addEventListener('DOMContentLoaded', () => {
    barba.init({
        transitions: [{
            name: 'enter-animation',
            once: ({next}) => new Promise((res, rej) => {
                gsap.fromTo(next.container.querySelector('.global-nav'), .2, {
                    y: -50,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1
                });
                gsap.fromTo(next.container.querySelectorAll('.content-block-header > *'), .5, {
                    y: 100,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    stagger: .1,
                    ease: Power2.easeOut
                });
                gsap.fromTo(next.container.querySelector('.content-bg'), .5, {
                    opacity: 0
                }, {
                    opacity: 1
                });
                setTimeout(() => res(), 500);
            }),
            leave: ({current}) => new Promise((res, rej) => {
                const mult = current.namespace === 'home' ? -1 : 1;

                gsap.fromTo(current.container.querySelector('.global-nav'), .2, {
                    y: 0,
                    opacity: 1
                }, {
                    y: -50,
                    opacity: 0
                });
                gsap.fromTo(current.container.querySelectorAll('.content-block-header > *'), .3, {
                    x: 0,
                    opacity: 1,
                }, {
                    x: 100 * mult,
                    opacity: 0,
                    stagger: .05,
                    ease: Power2.easeOut
                });
                gsap.fromTo(current.container.querySelector('.content-bg'), .3, {
                    opacity: 1
                }, {
                    opacity: 0
                });
                setTimeout(() => res(), 400);
            }),
            enter: ({next}) => new Promise((res, rej) => {
                const mult = next.namespace === 'home' ? -1 : 1;
                gsap.fromTo(next.container.querySelector('.global-nav'), .2, {
                    y: -50,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1
                });
                gsap.fromTo(next.container.querySelectorAll('.content-block-header > *'), .3, {
                    x: 100 * mult,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    stagger: .1,
                    ease: Power2.easeOut
                });
                gsap.fromTo(next.container.querySelector('.content-bg'), .3, {
                    opacity: 0
                }, {
                    opacity: 1
                });
                setTimeout(() => res(), 300);
            })
        }]
    });

    function frontLogic() {
        //closeMenuOnAnyClick();
        
        blockScrollHandling = false;
        parallaxBlock = document.querySelector('.parallax') || null;
        initParallax();
    }

    barba.hooks.once(() => frontLogic());
    barba.hooks.after(() => frontLogic());

    barba.hooks.beforeLeave(() => {
        window.removeEventListener('scroll', scrollParallaxHandler);
        window.removeEventListener('resize', scrollParallaxHandler)
    });
});