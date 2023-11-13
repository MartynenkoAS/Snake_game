class Score {
    constructor() {
        this.scorePosition     = document.querySelector(".score_value");
        this.scoreBestPosition = document.querySelector(".score_best_value");
        this.scoreValue        = 0;
        
    }

    scoreValueStart() {
        this.scoreValue = 0;
        if (localStorage.getItem("scoreBestValue") != null) {                       // если не первый запуск, читаем лучший результат из хранилища
            this.scoreBestPosition.textContent = localStorage.getItem("scoreBestValue");
        } else {
            localStorage.setItem("scoreBestValue", this.scoreValue.toString());          // если первый запуск, записываем в хранилище - 0
        }  
        this.scorePosition.textContent = this.scoreValue;
        }

    scoreValueShow() {
        this.scoreValue += 1;
        this.scorePosition.textContent = this.scoreValue;
        this.scoreBestPosition.textContent = localStorage.getItem("scoreBestValue");
        
        if (this.scoreValue >= localStorage.getItem("scoreBestValue")) {
            localStorage.setItem("scoreBestValue", this.scoreValue.toString());                 // записываем результат в локальное хранилище
            this.scoreBestPosition.textContent = localStorage.getItem("scoreBestValue");
        } 
    }

    

}
export default Score;
