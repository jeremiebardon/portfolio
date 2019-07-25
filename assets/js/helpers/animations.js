import {tween, spring, easing, keyframes} from 'popmotion';

export const homeAnimationText = tween({
    from: {
      y: 30,
      opacity: 0
    },
    to: { y: 0, opacity: 1},
    ease: {
        y: easing.easeInOut, 
        opacity: easing.easeInOut
    },
    duration: 1000,
    elapsed: 80
});

export const textAnimOutKeyframe = spring({
    from: {y:0, opacity: 1},
    to: {y: 25, opacity: 0},
    stiffness: 175,
    damping: 40,
    duration: 750
})

export const textAnimInKeyframe = spring({
    from: {y:25, opacity: 0},
    to: {y: 0, opacity: 1},
    stiffness: 175,
    damping: 40,
    duration: 750
})