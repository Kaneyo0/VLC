class Information {
    constructor(informationElem) {
        this.container = informationElem;
        this.title = informationElem.querySelector('.footer__title');
        this.mainInfo = informationElem.querySelector('.footer__first__content');
        this.secondInfo = informationElem.querySelector('.footer__second__content');
    }

    getInformation() {
        return this.container;
    }
    
    setData({title, first, second}) {
        this.title.textContent = title;
        this.mainInfo.textContent = first;
        this.secondInfo.textContent = second;
    }
}

export default Information;