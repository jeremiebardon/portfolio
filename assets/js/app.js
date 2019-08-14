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
                    e.target.classList.remove('active');
                    skillItemContainer.classList.remove('active');
                    tweenMaxAnimationSkills(skillsPresentationContent.children, true);
                    tweenMaxAnimationSkills(skillsPrecisionContent.children, false);
                } else if (!skillItemContainer.classList.contains('active')) {
                    e.target.classList.add('active');
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
        startAt: 0,
        perView: 2,
        focusAt: 'center',
        gap: 64,
        peek: 90,
        breakpoints: {
            980: { 
                perView: 1,
                peek: 32,
                gap: 16
            }
        }
    });
    projectSlider.mount();



    // Slider animation reveal project
    let sliderButtons = document.querySelectorAll('.glide__slide__button-fullscreen');
   
    sliderButtons.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            let overflowWindow = document.documentElement;
            overflowWindow.style.overflow = 'hidden'
            // Enter animation for project
            let project = e.target.parentElement.parentElement.getAttribute('data-name-project');
            let containerWrapper = document.getElementById(project);

            let containerTimelineEnter = new TimelineMax({});
            containerTimelineEnter.to(containerWrapper, 0, {
                zIndex: 999
            }, 0.05).to(containerWrapper, .4, { 
                opacity: 1, 
             }, 0.05);


            // Project container close button
            let containerCloseButton = containerWrapper.lastElementChild.firstElementChild;
            containerCloseButton.addEventListener('click', function(e) {
                overflowWindow.style.overflow = ''
                let container = e.target.parentElement.parentElement;
                let containerTimelineOut = new TimelineMax({});
                containerTimelineOut.to(container, .4, {
                    opacity: 0, 
                }, .2).to(container, .01, {
                    zIndex: -1
                })
            })
        })
    }) 
}  
    



