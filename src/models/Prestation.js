class Prestation {
    constructor(prestationElem) {
        this.container = prestationElem;
        this.description = prestationElem.querySelector('.card__description');
        this.price = prestationElem.querySelector('.card__price');
    }

    getPrestation() {
        return this.container;
    }
    
    setData({text, price}) {
        this.description.textContent = text;
        this.price.textContent = price;
    }
}

export default Prestation;