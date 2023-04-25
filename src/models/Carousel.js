class Carousel {
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     */
    constructor(element) {
        this.element = element;
        this.carousel = element.querySelector('.carousel__container');
        this.nextButton = this.element.querySelector('.carousel__next');
        this.prevButton = this.element.querySelector('.carousel__prev');
        this.carouselItemSize = this.carousel.querySelector('.card').clientWidth;
        this.createNavigation();
    }

    createNavigation() {
        this.toggleArrows();
        this.carousel.addEventListener('scroll', () => this.toggleArrows());
        this.nextButton.addEventListener('click', this.next.bind(this));
        this.prevButton.addEventListener('click', this.prev.bind(this));
    }

    next() {
        this.carousel.scrollTo(this.carousel.scrollLeft + this.carouselItemSize, 0);
    }

    prev() {
        this.carousel.scrollTo(this.carousel.scrollLeft - this.carouselItemSize, 0);
    }

    toggleArrows() {
        if (this.carousel.scrollLeft === 0) {
            this.prevButton.classList.add('carousel__disabled');
        } else {
            this.prevButton.classList.remove('carousel__disabled');
        }

        if (this.carousel.scrollLeft + this.carousel.clientWidth >= this.carousel.scrollWidth) {
            this.nextButton.classList.add('carousel__disabled');
        } else {
            this.nextButton.classList.remove('carousel__disabled');
        }
    }
}

export default Carousel;