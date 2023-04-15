class Forfait {
    constructor(forfaitElem, templates) {
        this.container = forfaitElem;
        this.name = forfaitElem.querySelector('.card__title');
        this.subname = forfaitElem.querySelector('.card__subtitle');
        this.price = forfaitElem.querySelector('.card__price');
        this.description = forfaitElem.querySelector('.card__description');
        this.templates = templates;
    }

    getForfait() {
        return this.container;
    } 

    setData({name, subname, price, description}) {
        this.name.textContent = name;
        if (subname) this.subname.textContent = subname;
        if (Array.isArray(price)) {
            let priceElem = this.price.querySelectorAll('.card__price__list');
            if (price.length > priceElem.length) {
                price.forEach(forfaitPrice => {
                    priceElem = this.templates.cloneNode(true).querySelector('.card__price__list');
                    priceElem.querySelector('.card__price__text').textContent = forfaitPrice.text;
                    priceElem.querySelector('.card__price__value').textContent = forfaitPrice.value;
        
                    this.price.append(priceElem);
                });
            } else {
                let index = 0;
                price.forEach(forfaitPrice => {
                    priceElem[index].querySelector('.card__price__text').textContent = forfaitPrice.text;
                    priceElem[index].querySelector('.card__price__value').textContent = forfaitPrice.value;
        
                    index++;
                });
            }    
        } else {
            this.price.textContent = price;
        }
        this.description.textContent = description;
    }
}

export default Forfait;