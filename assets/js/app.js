import Glide from '@glidejs/glide'
import {styler, stagger} from 'popmotion';
import {homeAnimationText} from './helpers/animations';
import {navbarSticky, changeNavItemActive, tweenMaxAnimationSkills, Visualiser} from './helpers/functions';
import { TweenMax, TimelineMax } from 'gsap';


{

    /************************************/
    /**** SCROLL ANIMATION & NAVBAR ****/
    /***********************************/
    ['DOMContentLoaded','scroll'].forEach( event => 
        document.addEventListener(event, function(e) {
            e.preventDefault()
            // Sticky header
            let navbarElement = document.querySelector('#nav__container');
            navbarSticky(navbarElement, 328, 'sticky');
            
            // Setting active item in Nav 
            const observer = new IntersectionObserver(changeNavItemActive, {threshold: 0.45});
            const sections = document.querySelectorAll('section');
            sections.forEach((section) => {
                observer.observe(section);
            });
        })
    );

    /************************/
    /**** HOME ANIMATION ****/
    /************************/
    document.addEventListener('DOMContentLoaded', () => {
        const homeContainer = document.querySelector('#home-container .inner-wrapper');
        const homeStylers = Array.from(homeContainer.children).map(styler);
        const homeAnimations = Array(homeStylers.length).fill(homeAnimationText)
    
        stagger(homeAnimations, 100).start((values) => values.forEach((v, i) => {
            homeStylers[i].set({
                "y": v.y,
                "opacity": v.opacity
            });
        }))
    })
    

    /**************************/
    /**** SKILLS ANIMATION ****/
    /**************************/
    document.addEventListener('DOMContentLoaded', () => {
        let skillsContainer = document.querySelectorAll('div[id*="box-"]');
        skillsContainer.forEach((skillItem) => {
            skillItem.lastElementChild.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation();

                let skillItemContainer = event.target.parentElement
                let skillsPresentationContent = e.target.parentElement.firstElementChild;
                let skillsPrecisionContent = e.target.parentElement.firstElementChild.nextElementSibling;

                if(skillItemContainer.classList.contains('active')) {
                    skillItemContainer.classList.remove('active');
                    tweenMaxAnimationSkills(skillsPresentationContent.children, true);
                    tweenMaxAnimationSkills(skillsPrecisionContent.children, false);
                } else if (!skillItemContainer.classList.contains('active')) {
                    skillItemContainer.classList.add('active');
                    tweenMaxAnimationSkills(skillsPresentationContent.children, false);
                    tweenMaxAnimationSkills(skillsPrecisionContent.children, true);
                }
            });
        });
    });

    

    /***************************/
    /**** SLIDER / PROJECT ****/
    /**************************/

    // Init slider
    let projectSlider = new Glide('.carousel__container', {
        type: 'carousel',
        startAt: 1,
        perView: 3,
        focusAt: 'center',
        gap: 24,
        breakpoints: {
            980: { 
                perView: 1 ,
                peek: 48
            }
        }
    });
    projectSlider.mount();


    let sliderButtons = document.querySelectorAll('.glide__slide__button-fullscreen')
    sliderButtons.forEach(item => {
        item.addEventListener('click', function(e) {
            let project = e.target.parentElement.parentElement.getAttribute('data-name-project')
            let container = document.getElementById(project);

            let containerTimelineEnter = new TimelineMax({});
            containerTimelineEnter.to(container, 0, {zIndex: 999}, 0.05).to(container, .4, {
                height: '100vh', 
                opacity: 1, 
             }, 0.05);

            let containerButton = container.firstElementChild.lastElementChild; 
            containerButton.addEventListener('click', function(e) {
                let container = e.target.parentElement.parentElement;

                let containerTimelineOut = new TimelineMax({});
                containerTimelineOut.to(container, .4, {
                    height: 0, 
                    opacity: 0, 
                }, 0.05).to(container, .01, {zIndex: -1});
            })
        })
    }) 
}  
    



