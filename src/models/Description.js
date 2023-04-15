class Description {
    constructor(descriptionElem) {
        this.container = descriptionElem;
        this.main = descriptionElem.querySelector('.description__content__main');
        this.subFrist = descriptionElem.querySelector('.description__content__sub__first');
        this.subSecond = descriptionElem.querySelector('.description__content__sub__second');
    }

    getPrestation() {
        return this.container;
    }
    
    setData({mainDescription, secondaryDescription, thirdDescription}) {
        this.main.textContent = mainDescription;
        this.subFrist.textContent = secondaryDescription;
        this.subSecond.textContent = thirdDescription;
    }
}

export default Description;