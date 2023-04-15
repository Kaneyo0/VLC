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
// const navIcons = document.querySelectorAll('.nav__icon');
const main = document.querySelector('.main');

class View {
    templates = document.querySelector('.templates').content;
    navMenu = document.querySelector('.nav');
    languageSelector = document.querySelector('.language__selector');
    articles = main.querySelectorAll('.article');
    forfaitsList = document.querySelector('.forfaits__list');
    forfaitsArticle = document.querySelector('.forfaits');
    prestationList = document.querySelector('.prestations__list');
    prestationArticle = document.querySelector('.prestations');
    footerContent = document.querySelector('.footer');
    url = window.location.href;
    cards;
    navElements;
    navIcons;

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
        this.updateActiveNavPosition();
        
        this.contactMessage.textContent = contactMessage[`${this.languageSelector.value}`];
        
        new Carousel(this.forfaitsArticle.querySelector('.article__content'), );
        new Carousel(this.prestationArticle.querySelector('.article__content'), {
            slidesToScroll: 1,
            slidesVisible: 2
        });
    }

    createEventListener() {
        this.languageSelector.addEventListener('change', event => {
            this.setAllData();
        });
        
        document.addEventListener('click', event => {
            let elemCliked = event.target;
            switch (true) {
                default :
                    this.cards.forEach(card => {
                        if (card.contains(elemCliked)) {
                            this.navElements[this.navElements.length - 1].click()
                        };
                    });
            }
        });

        main.addEventListener('scroll', () => {
            this.updateActiveNavPosition();
        });
    }

    updateActiveNavPosition() {
        const snapPoints = main.querySelectorAll('.article');
        const currentSnapPointIndex = Array.from(snapPoints).findIndex((snapPoint) => {
            const rect = snapPoint.getBoundingClientRect();
            const top = rect.top;
            const height = rect.height;
            const bottom = top + height;
            return top <= 0 && bottom >= 0;
          });
        this.navIcons.forEach((navIcon, index) => {
            if (index === currentSnapPointIndex + 1) {
                navIcon.classList.add('nav__element__current');
            } else {
                navIcon.classList.remove('nav__element__current');
            }
        });
    }

    createLanguagesSelector() {
        this.removeAllChildren(this.languageSelector);

        languages.forEach(language => {
            let option = this.templates.cloneNode(true).querySelector('.language__option');
            option.value = language.value;
            option.label = language.name;
            this.languageSelector.append(option);
        });
    }

    createNavMenu() {
        this.removeAllChildren(this.navMenu);
        this.articles.forEach(article => {
            let navElem = this.templates.cloneNode(true).querySelector('.nav__element');
            let navText = navElem.querySelector('.nav__text');
            navElem.href = '#' + article.classList[1];
            navText.textContent = article.classList[1];
            this.navMenu.append(navElem);
        });
        this.navElements = document.querySelectorAll('.nav__element');
        this.navIcons = document.querySelectorAll('.nav__icon');
    }

    createDescription() {
        this.description = new Description(document.querySelector('.description__content'));
        this.description.setData(description[`${this.languageSelector.value}`]);
    }

    createForfaits() {
        forfaits[`${this.languageSelector.value}`].forEach(forfait => {
            let forfaitElem = this.templates.cloneNode(true).querySelector('.forfait__card');
            let newForfait = new Forfait(forfaitElem, this.templates);
            newForfait.setData(forfait);

            this.allForfaits.push(newForfait);
            this.forfaitsList.append(newForfait.getForfait());
        });
    }

    createPrestations() {
        prestations[`${this.languageSelector.value}`].forEach(prestation => {
            let prestationElem = this.templates.cloneNode(true).querySelector('.prestation__card');
            let newPrestation = new Prestation(prestationElem);
            newPrestation.setData(prestation);

            this.allPrestations.push(newPrestation);
            this.prestationList.append(newPrestation.getPrestation());
        });
    }

    createInformations() {
        informations[`${this.languageSelector.value}`].forEach(information => {
            let informationElem = this.templates.cloneNode(true).querySelector('.footer__block');
            let newInformation = new Information(informationElem);
            newInformation.setData(information);

            this.allInformations.push(newInformation);
            this.footerContent.append(newInformation.getInformation());
        });
    }

    setAllData() {
        this.description.setData(description[`${this.languageSelector.value}`]);
        this.contactMessage.textContent = contactMessage[`${this.languageSelector.value}`];

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

        index = 0;
        informations[`${this.languageSelector.value}`].forEach(information => {
            this.allInformations[index].setData(information);
            index++;
        });
    }

    removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.lastChild);
        }
    }
}

export default View;