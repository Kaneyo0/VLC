import forfaits from '../../data/forfaits.js';
import prestations from '../../data/prestations.js';
import informations from '../../data/informations.js';
import Carousel from '../models/Carousel.js';

const timeBeforeScroll = 500;

class View {
    forfaitsList = document.querySelector('.forfaits__list');
    forfaitsArticle = document.querySelector('.forfaits');
    prestationList = document.querySelector('.prestations__list');
    prestationArticle = document.querySelector('.prestations');
    cards;
    main = document.querySelector('.main');
    navMenu = document.querySelector('.nav__menu');
    navElements;
    articles = this.main.querySelectorAll('.article');
    footerContent = document.querySelector('.footer__content');
    templates = document.querySelector('.templates').content;
    currentLink = 0;
    url = window.location.href;
    lastScroll = Date.now();

    constructor(){
        this.createNavMenu();
        this.createForfaits();
        this.createPrestations();
        this.createInformations();
        this.cards = document.querySelectorAll('.card');
        this.createEventListener();

        new Carousel(this.forfaitsArticle.querySelector('.article__content'));
        new Carousel(this.prestationArticle.querySelector('.article__content'), {
            slidesToScroll: 2,
            slidesVisible: 2
        });
        this.navElements[0].click();
    }

    createEventListener() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        document.addEventListener('click', event => {
            let elemCliked = event.target;
            switch (true) {
                case elemCliked.classList.contains('nav__element') || 
                    elemCliked.classList.contains('nav__text') || 
                    elemCliked.classList.contains('nav__icon') :
                    let index = 0;
                    this.navElements.forEach(navElement => {
                        navElement.querySelector('.nav__icon').classList.remove("current__nav");
                        if (navElement == elemCliked || navElement.contains(elemCliked)) {
                            this.currentLink = index;
                            navElement.querySelector('.nav__icon').classList.add("current__nav");
                        }
                        index++;
                    });
                    break;
                default :
                    this.cards.forEach(card => {
                        if (card.contains(elemCliked)) {
                            this.navElements[this.navElements.length - 1].click()
                        };
                    });
            }
        });
        
        document.addEventListener('wheel', event => {
            let index = this.currentLink;
            if (Date.now() - this.lastScroll > timeBeforeScroll) {
                if (!this.checkScrollDirectionIsUp(event) && this.currentLink < this.navElements.length-1) index++;
                if (this.checkScrollDirectionIsUp(event) && this.currentLink > 0) index--;
                this.goToArticle(index);
            } 
        });
    }

    createNavMenu() {
        let navElem;
        let navText;
        this.articles.forEach(article => {
            navElem = this.templates.cloneNode(true).querySelector('.nav__element');
            navText = navElem.querySelector('.nav__text');
            navElem.href = '#' + article.classList[1];
            navText.textContent = article.classList[1];
            this.navMenu.append(navElem);
        });
        this.navElements = document.querySelectorAll('.nav__element');
    }

    createForfaits() {
        let newForfait;
        let title;
        let description;
        let price;
        let priceElem;
        let priceText;
        let priceValue;
        forfaits.forEach(forfait => {
            newForfait = this.templates.cloneNode(true).querySelector('.forfait__card');
            title = newForfait.querySelector('.card__title');
            description = newForfait.querySelector('.card__description');
            price = newForfait.querySelector('.card__price');
            title.textContent = forfait.name;
            if (forfait.price.length > 1) {
                forfait.price.forEach(forfaitPrice => {
                    priceElem = this.templates.cloneNode(true).querySelector('.price__list');
                    priceText = priceElem.querySelector('.price__text');
                    priceValue = priceElem.querySelector('.price__value');

                    priceText.textContent = forfaitPrice.text;
                    priceValue.textContent = forfaitPrice.value + '€';

                    price.append(priceElem);
                })
            } else {
                price.textContent = forfait.price + '€';
            }
            description.textContent = forfait.description;
            this.forfaitsList.append(newForfait);
        });
    }

    createPrestations() {
        let newPrestation;
        let description;
        let price;
        prestations.forEach(prestation => {
            newPrestation = this.templates.cloneNode(true).querySelector('.prestation__card');
            description = newPrestation.querySelector('.card__description');
            price = newPrestation.querySelector('.card__price');
            description.textContent = prestation.text;
            price.textContent = prestation.price;
            this.prestationList.append(newPrestation);
        });
    }

    createInformations() {
        let footerTitle;
        let footerMainInfo;
        let footerSecondInfo;
        let footerBlock;
        informations.forEach(information => {
            footerBlock = this.templates.cloneNode(true).querySelector('.footer__block');
            footerTitle = footerBlock.querySelector('.footer__title');
            footerMainInfo = footerBlock.querySelector('.footer__first__content');
            footerSecondInfo = footerBlock.querySelector('.footer__second__content');

            footerTitle.textContent = information.title;
            footerMainInfo.textContent = information.first;
            footerSecondInfo.textContent = information.second;

            this.footerContent.append(footerBlock);
        });
    }

    goToArticle(index) {
        this.lastScroll = Date.now();
        this.navElements[index].click();
    }
      
    checkScrollDirectionIsUp(event) {
        if (event.deltaY != 0 && (event.deltaX > 300 || event.deltaX < -300)) return event.wheelDelta > 0;
        return event.deltaY < 0;
    }
}

export default View;