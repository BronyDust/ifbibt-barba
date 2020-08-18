import barba from '@barba/core';
import gsap, {Power2} from 'gsap';
import './content.css';
import './nav.css';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {


    barba.init({
        sync: true,
        transitions: [{
            name: 'default-transition',
            leave(data) {
                return gsap.fromTo(data.current.container, .2, {
                    x: 0,
                    opacity: 1
                }, {
                    x: -100,
                    opacity: 0,
                    ease: Power2.easeOut
                });
            },
            enter(data) {
                return gsap.fromTo(data.next.container, .2, {
                    x: 100,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    ease: Power2.easeOut
                });
            }
        }]
    });
});