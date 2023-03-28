import languages from '../../data/languages.js';
import description from '../../data/description/description.js';
import forfaits from '../../data/forfaits/forfaits.js';
import prestations from '../../data/prestations/prestations.js';
import contactMessage from '../../data/contactMessage.js';
import informations from '../../data/informations/informations.js';

import Description from '../models/Description.js';
import Forfait from '../models/Forfait.js';
import Prestation from '../models/Prestation.js';
import Information from '../models/Information.js';
import Carousel from '../models/Carousel.js';

const timeBeforeScroll = 400;

class View {
    forfaitsList = document.querySelector('.forfaits__list');
    forfaitsArticle = document.querySelector('.forfaits');
    prestationList = document.querySelector('.prestations__list');
    prestationArticle = document.querySelector('.prestations');
    cards;
    main = document.querySelector('.main');
    languageSelector = document.querySelector('.language__selector');
    navMenu = document.querySelector('.nav__menu');
    navElements;
    articles = this.main.querySelectorAll('.article');
    footerContent = document.querySelector('.footer__content');
    templates = document.querySelector('.templates').content;
    currentLink = 0;
    url = window.location.href;
    lastScroll = Date.now();
    xDown = null;                                                        
    yDown = null;

    constructor() {
        this.description;
        this.allForfaits = [];
        this.allPrestations = [];
        this.allInformations = [];
        this.contactMessage = document.querySelector('.contact__message');
        
        this.createLanguagesSelector();
        this.createDescription();
        this.createNavMenu();
        this.createForfaits();
        this.createPrestations();
        this.createInformations();
        this.cards = document.querySelectorAll('.card');
        this.createEventListener();
        
        this.contactMessage.textContent = contactMessage[`${this.languageSelector.value}`];
        
        new Carousel(this.forfaitsArticle.querySelector('.article__content'), );
        new Carousel(this.prestationArticle.querySelector('.article__content'), {
            slidesToScroll: 1,
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

        this.languageSelector.addEventListener('change', event => {
            this.setAllData();
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

        document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);        
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    }

    createLanguagesSelector() {
        let option;

        this.removeAllChildren(this.languageSelector);

        languages.forEach(language => {
            option = this.templates.cloneNode(true).querySelector('.language__option');
            option.value = language.value;
            option.label = language.name;
            this.languageSelector.append(option);
        });
    }

    createNavMenu() {
        let navElem;
        let navText;

        this.removeAllChildren(this.navMenu);

        this.articles.forEach(article => {
            navElem = this.templates.cloneNode(true).querySelector('.nav__element');
            navText = navElem.querySelector('.nav__text');
            navElem.href = '#' + article.classList[1];
            navText.textContent = article.classList[1];
            this.navMenu.append(navElem);
        });
        this.navElements = document.querySelectorAll('.nav__element');
    }

    createDescription() {
        this.description = new Description(document.querySelector('.description__contenu'));
        this.description.setData(description[`${this.languageSelector.value}`]);
    }

    createForfaits() {
        let forfaitElem;
        let newForfait;

        forfaits[`${this.languageSelector.value}`].forEach(forfait => {
            forfaitElem = this.templates.cloneNode(true).querySelector('.forfait__card');
            newForfait = new Forfait(forfaitElem, this.templates);
            newForfait.setData(forfait);

            this.allForfaits.push(newForfait);
            this.forfaitsList.append(newForfait.getForfait());
        });
    }

    createPrestations() {
        let prestationElem;
        let newPrestation;

        prestations[`${this.languageSelector.value}`].forEach(prestation => {
            prestationElem = this.templates.cloneNode(true).querySelector('.prestation__card');
            newPrestation = new Prestation(prestationElem);
            newPrestation.setData(prestation);

            this.allPrestations.push(newPrestation);
            this.prestationList.append(newPrestation.getPrestation());
        });
    }

    createInformations() {
        let informationElem;
        let newInformation

        informations[`${this.languageSelector.value}`].forEach(information => {
            informationElem = this.templates.cloneNode(true).querySelector('.footer__block');
            newInformation = new Information(informationElem);
            newInformation.setData(information);

            this.allInformations.push(newInformation);
            this.footerContent.append(newInformation.getInformation());
        });
    }

    setAllData() {
        this.description.setData(description[`${this.languageSelector.value}`]);

        let index = 0;
        forfaits[`${this.languageSelector.value}`].forEach(forfait => {
            this.allForfaits[index].setData(forfait);
            index++;
        });

        index = 0;
        prestations[`${this.languageSelector.value}`].forEach(prestation => {
            this.allPrestations[index].setData(prestation);
            index++;
        });

        this.contactMessage.textContent = contactMessage[`${this.languageSelector.value}`];

        index = 0;
        informations[`${this.languageSelector.value}`].forEach(information => {
            this.allInformations[index].setData(information);
            index++;
        });
    }

    goToArticle(index) {
        this.lastScroll = Date.now();
        this.navElements[index].click();
    }

    getTouches(evt) {
        return evt.touches;
    }                                                     
                                                                               
    handleTouchStart(evt) {
        const firstTouch = this.getTouches(evt)[0];                                      
        this.xDown = firstTouch.clientX;                                      
        this.yDown = firstTouch.clientY;                                      
    }                                               
                                                                               
    handleTouchMove(evt) {
        if (! this.xDown || ! this.yDown) return;
    
        let xUp = evt.touches[0].clientX;                                    
        let yUp = evt.touches[0].clientY;
    
        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;

        let index = this.currentLink;
                                                                             
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                /* right swipe */ 
            } else {
                /* left swipe */
            }                       
        } else {
            if (yDiff > 0) {
                index++; 
            } else { 
                index--;
            } 
            
            this.goToArticle(index);
        }

        /* reset values */
        this.xDown = null;
        this.yDown = null;                                             
    }
      
    checkScrollDirectionIsUp(event) {
        if (event.deltaY != 0 && (event.deltaX > 300 || event.deltaX < -300)) return event.wheelDelta > 0;
        return event.deltaY < 0;
    }

    removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.lastChild);
        }
    }
}

export default View;