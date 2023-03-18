class Description {
    constructor(descriptionElem) {
        this.container = descriptionElem;
        this.main = descriptionElem.querySelector('.main__description');
        this.secondary = descriptionElem.querySelector('.secondary__description');
        this.third = descriptionElem.querySelector('.third__description');
    }

    getPrestation() {
        return this.container;
    }
    
    setData({mainDescription, secondaryDescription, thirdDescription}) {
        this.main.textContent = mainDescription;
        this.secondary.textContent = secondaryDescription;
        this.third.textContent = thirdDescription;
    }
}

export default Description;