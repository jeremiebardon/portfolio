import TweenMax from "gsap/TweenMax";

/**
 * @param  {string} elementToAddClass Element where class is add
 * @param {string} elementClassName Class name added to the element
 */
export const toggleClassFunction = (elementToAddClass, elementClassName) => {
    elementToAddClass.classList.toggle(elementClassName)
}

/**
 * @param  {HTMLElement} triggerElement Add sticky on this element
 * @param  {number} scrollY ScrollY value to add class
 * @param {string} classToAdd Name of the class added
 */
export const navbarSticky = (triggerElement, scrollY, classToAdd) => {
    let windowHeight = window.scrollY;
    if(windowHeight > scrollY && !triggerElement.classList.contains(classToAdd)) {
        triggerElement.classList.toggle(classToAdd)
    } else if (windowHeight < scrollY && triggerElement.classList.contains(classToAdd)) {
        triggerElement.classList.toggle(classToAdd)
    }
}

/**
 * @param  {HTMLElement} entries HTML element to observe
 * NB: Modify observer for add more flexibility
 */
export const changeNavItemActive = (entries, observer) => {
    entries.forEach((entry) => {
        // verify the element is intersecting
        if(entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            // remove old active class

            let activeItems = document.querySelector('.nav-items__container li a.active');
            if(activeItems !== null) {
                activeItems.classList.remove('active')
            }

            // get id of the intersecting section
            var id = entry.target.getAttribute('id');

            // find matching link & add appropriate class
            var newLink = document.querySelector(`a[href="#${id}"]`);
            newLink.classList.add('active')
        }
    });
}

export const tweenMaxAnimationSkills = (selector, reverse) => {
    if(reverse) {
        TweenMax.staggerTo(selector, .5, {
            top: 0, 
            opacity: 1, 
            ease: Expo.easeOut
        }, 0.05);
    } else {
        TweenMax.staggerTo(selector, .5, {
            top: 64, 
            opacity: 0, 
            ease: Expo.easeOut
        }, 0.05).reverse();
    }
}



 /**********************************/
/************** MODAL *************/
/**********************************/
  





