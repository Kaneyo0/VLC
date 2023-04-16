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

const main = document.querySelector('.main');
const navMenu = document.querySelector('.nav');
const languageSelector = document.querySelector('.language__selector');
const carousels = document.querySelectorAll('.carousel');
const templates = document.querySelector('.templates').content;

class View {
    constructor() {
        this.description;
        this.allForfaits = [];
        this.allPrestations = [];
        this.allInformations = [];
        this.contactMessage = document.querySelector('.contact__message');
        this.articles = main.querySelectorAll('.article');
        this.forfaitsList = document.querySelector('.forfaits__list');
        this.forfaitsArticle = document.querySelector('.forfaits');
        this.prestationList = document.querySelector('.prestations__list');
        this.prestationArticle = document.querySelector('.prestations');
        this.footerContent = document.querySelector('.footer');
        this.url = window.location.href;
        this.cards;
        this.navElements;
        this.navIcons;
        this.initView();
    }

    initView() {
        this.createLanguagesSelector();
        this.createDescription();
        this.createNavMenu();
        this.createForfaits();
        this.createPrestations();
        this.createInformations();
        this.cards = document.querySelectorAll('.card');
        this.createEventListener();
        this.updateActiveNavPosition();
        this.contactMessage.textContent = contactMessage[`${languageSelector.value}`];
        
        carousels.forEach(carousel => {
            new Carousel(carousel);
        });
    }

    createEventListener() {
        languageSelector.addEventListener('change', () => {
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
        this.removeAllChildren(languageSelector);
        languages.forEach(language => {
            let option = templates.cloneNode(true).querySelector('.language__option');
            option.value = language.value;
            option.label = language.name;
            languageSelector.append(option);
        });
    }

    createNavMenu() {
        this.removeAllChildren(navMenu);
        this.articles.forEach(article => {
            let navElem = templates.cloneNode(true).querySelector('.nav__element');
            let navText = navElem.querySelector('.nav__text');
            navElem.href = '#' + article.classList[1];
            navText.textContent = article.classList[1];
            navMenu.append(navElem);
        });
        this.navElements = document.querySelectorAll('.nav__element');
        this.navIcons = document.querySelectorAll('.nav__icon');
    }

    createDescription() {
        this.description = new Description(document.querySelector('.description__content'));
        this.description.setData(description[`${languageSelector.value}`]);
    }

    createForfaits() {
        forfaits[`${languageSelector.value}`].forEach(forfait => {
            let forfaitElem = templates.cloneNode(true).querySelector('.forfait__card');
            let newForfait = new Forfait(forfaitElem, templates);
            newForfait.setData(forfait);

            this.allForfaits.push(newForfait);
            this.forfaitsList.append(newForfait.getForfait());
        });
    }

    createPrestations() {
        prestations[`${languageSelector.value}`].forEach(prestation => {
            let prestationElem = templates.cloneNode(true).querySelector('.prestation__card');
            let newPrestation = new Prestation(prestationElem);
            newPrestation.setData(prestation);

            this.allPrestations.push(newPrestation);
            this.prestationList.append(newPrestation.getPrestation());
        });
    }

    createInformations() {
        informations[`${languageSelector.value}`].forEach(information => {
            let informationElem = templates.cloneNode(true).querySelector('.footer__block');
            let newInformation = new Information(informationElem);
            newInformation.setData(information);

            this.allInformations.push(newInformation);
            this.footerContent.append(newInformation.getInformation());
        });
    }

    setAllData() {
        this.description.setData(description[`${languageSelector.value}`]);
        this.contactMessage.textContent = contactMessage[`${languageSelector.value}`];

        let index = 0;
        forfaits[`${languageSelector.value}`].forEach(forfait => {
            this.allForfaits[index].setData(forfait);
            index++;
        });

        index = 0;
        prestations[`${languageSelector.value}`].forEach(prestation => {
            this.allPrestations[index].setData(prestation);
            index++;
        });

        index = 0;
        informations[`${languageSelector.value}`].forEach(information => {
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