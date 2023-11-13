class Apple {
    constructor() {
        this.appleArr = [];
    }

    appleRandomCoord(field) {                               // функция генерации яблока
        let i = true;
        while (i) {
            this.appleArr[0] = Math.floor(Math.random() * 9 + 1);
            this.appleArr[1] = Math.ceil (Math.random() * 9 + 1);
            const apple = field.querySelector(`[data-x="${this.appleArr[0]}"][data-y="${this.appleArr[1]}"]`);
            if (!apple.classList.contains("apple_element") && !apple.classList.contains("snake_head_element") 
                && !apple.classList.contains("snake_body_element") && this.appleArr[0] >=1 && this.appleArr[0] <=10 
                && this.appleArr[1] >= 1 && this.appleArr[1] <=10) {
                apple.className = "apple_element";
                i = false;
            }
        }
    }
    
}

export default Apple;