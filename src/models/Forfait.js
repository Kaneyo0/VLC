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
            let priceElem = this.price.querySelectorAll('.price__list');
            if (price.length > priceElem.length) {
                console.log(price);
                price.forEach(forfaitPrice => {
                    priceElem = this.templates.cloneNode(true).querySelector('.price__list');
                    priceElem.querySelector('.price__text').textContent = forfaitPrice.text;
                    priceElem.querySelector('.price__value').textContent = forfaitPrice.value;
        
                    this.price.append(priceElem);
                });
            } else {
                let index = 0;
                price.forEach(forfaitPrice => {
                    priceElem[index].querySelector('.price__text').textContent = forfaitPrice.text;
                    priceElem[index].querySelector('.price__value').textContent = forfaitPrice.value;
        
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