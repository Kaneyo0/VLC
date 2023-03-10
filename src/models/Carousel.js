class Carousel {
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options);
        this.currentSlide = 0;
        this.createNavigation();
    }

    createNavigation() {
        
    }

    next() {

    }

    prev() {

    }
}

export default Carousel;