import {styler, stagger} from 'popmotion';
import CustomCarousel from './component/customCarousel'
import {homeAnimationText, textAnimOutKeyframe, textAnimInKeyframe} from './helpers/animations';
import {toggleClassFunction} from './helpers/functions';

/**************************/
/**** SCROLL ANIMATION ****/
/**************************/


/************************/
/**** HOME ANIMATION ****/
/************************/
const homeContainer = document.querySelector('#home-container .inner-wrapper');
const homeStylers = Array.from(homeContainer.children).map(styler);
const homeAnimations = Array(homeStylers.length).fill(homeAnimationText)

stagger(homeAnimations, 100).start((values) => values.forEach((v, i) => {
    homeStylers[i].set({
        "y": v.y,
        "opacity": v.opacity
    });
}))

/**************************/
/**** SKILLS ANIMATION ****/
/**************************/
let buttonsArray = document.querySelectorAll(".skills-button");

buttonsArray.forEach( button => {
    const skillsContentWrapper = button.previousElementSibling.firstElementChild.nextElementSibling;
    const mainContentWrapper = button.previousElementSibling.firstElementChild;

    const mainContentElementsStylers = Array.from(button.previousElementSibling.firstElementChild.children)
                        .map(styler)
    const skillsOutAnimations = Array(mainContentElementsStylers.length).fill(textAnimOutKeyframe)
    const skillsInAnimations = Array(mainContentElementsStylers.length).fill(textAnimInKeyframe) 
    
    button.addEventListener("click", () => {
        if(button.parentNode.classList.contains('active')) {
            stagger(skillsInAnimations, 100)
            .start((values) => values.forEach((v, i) => {
                mainContentWrapper.style.display = "block";
                skillsContentWrapper.style.display = "none";
                mainContentElementsStylers[i].set({
                    "y": v.y,
                    "opacity": v.opacity
                });
            }))
        } else {
            stagger(skillsOutAnimations, 100).start((values) => values.forEach((v, i) => {
                mainContentWrapper.style.display = "none"
                skillsContentWrapper.style.display = "block"
                mainContentElementsStylers[i].set({
                    "y": v.y,
                    "opacity": v.opacity
                });
            }));
        }
        toggleClassFunction(button.parentNode, 'active'); 
    });
});

/***************************/
/**** SLIDER / PROJECT ****/
/**************************/
document.addEventListener('DOMContentLoaded', function() {
    new CustomCarousel(document.querySelector('#carousel-projects'), {
        slidesToScroll: 1,
        slidesVisible: 3,
        loop: true
    })
});