'use strict'

export default class CustomCarousel {
    /**
     * @param  {HTMLElement} element
     * @param  {Object} options
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 3,
            slidesVisible: 3,
            loop: false
        }, options);
        this.currentSlide = 0
        this.activeIndex = 1
        this.moveCallbacks = []

        let children = [].slice.call(element.children);

        // Create slider instance with div
        this.root = this.createDivWithClass('carousel');
        this.wrapper = this.createDivWithClass('carousel__wrapper');

        this.root.appendChild(this.wrapper);
        this.element.appendChild(this.root);

        this.items = children.map( child => {
            let item = this.createDivWithClass('carousel__item');
            item.appendChild(child)
            this.wrapper.appendChild(item);
            return item
        })
        
        this.setStyle()
        this.createNavigation()
    }
    
    /**
     * Apply style value to items
     */
    setStyle() {
        let ratio = this.items.length / this.options.slidesVisible;
        this.wrapper.style.width = (ratio * 100) + "%";
        this.items.forEach(item =>  
            item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")
    }

    /**
     * @param  {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement('div');
        div.setAttribute('class', className)
        return div
    }

    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next');
        let prevButton = this.createDivWithClass('carousel__prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);

        nextButton.addEventListener('click', this.nextSlide.bind(this))
        prevButton.addEventListener('click', this.prevSlide.bind(this))

        if(this.options.loop === true) {
            return
        }

        this.onMove(index => {
            console.log(index)
        })
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + this.options.slidesToScroll)
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - this.options.slidesToScroll)
    }
    
    /**
     * Move slider to the next item(s)
     * @param  {number} index
     */
    goToSlide(index) {
        if(index < 0) {
            index = this.items.length - this.options.slidesVisible;
        }
        if( index >= this.items.length || 
            this.items[this.currentSlide + this.options.slidesVisible] === undefined) {
            index = 0
        };

        let calcTranslateX = index * -100 / this.items.length;
        this.currentSlide = index;
        this.wrapper.style.transform = 'translate3d(' + calcTranslateX + '%, 0, 0)';

        this.moveCallbacks.forEach(cb => cb(index))
        
    }
    /**
     * @param  {moveCallbacks} callback
     */
    onMove(callback) {
        this.moveCallbacks.push(callback)
    }

};
