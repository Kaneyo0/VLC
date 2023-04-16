class Carousel {
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     */
    constructor(element) {
        this.element = element;
        this.carousel = element.querySelector('.carousel__container');
        this.carouselItemSize = this.carousel.querySelector('.card').clientWidth;
        this.createNavigation();
    }

    createNavigation() {
        let nextButton = this.element.querySelector('.carousel__next');
        let prevButton = this.element.querySelector('.carousel__prev');
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
    }

    next() {
        this.carousel.scrollTo(this.carousel.scrollLeft + this.carouselItemSize, 0);
    }

    prev() {
        this.carousel.scrollTo(this.carousel.scrollLeft - this.carouselItemSize, 0);
    }
}

export default Carousel;