class Carousel {
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     */
    constructor(element, options = {}) {
        this.element = element;
        this.carousel = element.querySelector('.carousel__container');
        this.carouselItems = this.carousel.querySelectorAll('.card');
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options);
        this.currentSlide = 0;
        this.createNavigation();
    }

    createNavigation() {
        let nextButton = this.element.querySelector('.carousel__next');
        let prevButton = this.element.querySelector('.carousel__prev');
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
    }

    next() {
        this.goToItem(this.currentSlide + this.options.slidesToScroll);
    }

    prev() {
        this.goToItem(this.currentSlide - this.options.slidesToScroll);
    }

    goToItem(index) {
        if (index < 0) index = this.carouselItems.length - this.options.slidesToScroll;
        else if (index >= this.carouselItems.length ) index = 0;

        let translateX = index * (-100 / this.carouselItems.length);
        this.carousel.style.transform = `translate3d(${translateX}rem, 0, 0)`;
        this.currentSlide = index;
    }
}

export default Carousel;