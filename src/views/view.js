import forfaits from '../../data/forfaits.js';
import prestations from '../../data/prestations.js';
import informations from '../../data/informations.js';
import Carousel from '../models/Carousel.js';

let forfaitsList = document.querySelector('.forfaits__list');
let prestationList = document.querySelector('.prestations__list');
let main = document.querySelector('.main');
let navMenu = document.querySelector('.nav__menu');
let articles = main.querySelectorAll('.article');
let footerContent = document.querySelector('.footer__content');
let templates = document.querySelector('.templates').content;
let currentLink = 0;
let url = window.location.href;
const timeBeforeScroll = 800;
let lastScroll = Date.now();

let navElem;
let navText;
articles.forEach(article => {
    navElem = templates.cloneNode(true).querySelector('.nav__element');
    navText = navElem.querySelector('.nav__text');
    navElem.href = '#' + article.classList[1];
    navText.textContent = article.classList[1];
    navMenu.append(navElem);
});

let navElements = document.querySelectorAll('.nav__element');

document.addEventListener('DOMContentLoaded', function() {
    new Carousel(document.querySelector('.forfaits__list'), {
        slidesToScroll: 3,
        slidesVisible: 2
    });
});

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
        case elemCliked.classList.contains("nav__element") :
            navElements.forEach(navElement => {
                navElement.querySelector('.nav__icon').classList.remove("current__nav");
            });
            elemCliked.querySelector('.nav__icon').classList.add("current__nav");
            break;
    }
});

document.addEventListener('wheel', event => {
    if (Date.now() - lastScroll > timeBeforeScroll) checkScrollDirection(event);
});

function checkScrollDirection(event) {
    lastScroll = Date.now();
    if (!checkScrollDirectionIsUp(event) && currentLink < navElements.length-1) currentLink++;
    if (checkScrollDirectionIsUp(event) && currentLink > 0) currentLink--;
    navElements[currentLink].click();
}
  
function checkScrollDirectionIsUp(event) {
    if (event.deltaY != 0 && (event.deltaX > 300 || event.deltaX < -300)) return event.wheelDelta > 0;
    return event.deltaY < 0;
}

let newForfait;
let title;
let description;
let price;
let priceElem;
let priceText;
let priceValue;
forfaits.forEach(forfait => {
    newForfait = templates.cloneNode(true).querySelector('.forfait__card');
    title = newForfait.querySelector('.card__title');
    description = newForfait.querySelector('.card__description');
    price = newForfait.querySelector('.card__price');
    title.textContent = forfait.name;
    if (forfait.price.length > 1) {
        forfait.price.forEach(forfaitPrice => {
            priceElem = templates.cloneNode(true).querySelector('.price__list');
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
    forfaitsList.append(newForfait);
});

let newPrestation;
prestations.forEach(prestation => {
    newPrestation = templates.cloneNode(true).querySelector('.prestation__card');
    description = newPrestation.querySelector('.card__description');
    price = newPrestation.querySelector('.card__price');
    description.textContent = prestation.text;
    price.textContent = prestation.price;
    prestationList.append(newPrestation);
});

let footerTitle;
let footerMainInfo;
let footerSecondInfo;
let footerBlock;
informations.forEach(information => {
    footerBlock = templates.cloneNode(true).querySelector('.footer__block');
    footerTitle = footerBlock.querySelector('.footer__title');
    footerMainInfo = footerBlock.querySelector('.footer__first__content');
    footerSecondInfo = footerBlock.querySelector('.footer__second__content');

    footerTitle.textContent = information.title;
    footerMainInfo.textContent = information.first;
    footerSecondInfo.textContent = information.second;

    footerContent.append(footerBlock);
});

navElements[0].querySelector('.nav__icon').classList.add("current__nav");
if (url.includes('#')) {
    document.location.href=url.split('#')[0]; 
}
