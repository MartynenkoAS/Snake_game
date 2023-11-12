class Field {
    constructor(field) {
        this._field = field;
        
        drawField() {
            let x = y = 1;
            for (let i = 0; i < 100; i++) {
                let divFild = document.createElement('div');
                divFild.classList.add("game_fildElement");
            
                if (x > 10) {
                    x = 1;
                    y++;
                } 
                divFild.setAttribute("data-x", x);
                divFild.setAttribute("data-y", y);
                divFild.textContent = `${x}/${y}`
                    x++;
            
                this._field.appendChild(divFild);
            }
        }
    }
}
export default Field;