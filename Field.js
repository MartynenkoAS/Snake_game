class Field {
    constructor() {
        this.field = document.querySelector(".game_field");
        
    }
        drawField() {
            this.deleteField()                          // удаляем дочерние элементы поля

            let x = 1;
            let y = 1;
            for (let i = 0; i < 100; i++) {
                let divFild = document.createElement("div");
                divFild.classList.add("field_element");
            
                if (x > 10) {
                    x = 1;
                    y++;
                } 
                divFild.setAttribute("data-x", x);
                divFild.setAttribute("data-y", y);
                    x++;
            
                this.field.appendChild(divFild);
            }
        }
        deleteField() {
            while (this.field.firstChild) {                                                  // удаляем дочерние элементы поля
                this.field.removeChild(this.field.firstChild);
            } 
        }


}
export default Field;