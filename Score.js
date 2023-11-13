class Score {
    constructor() {
        this.scorePosition     = document.querySelector(".score_value");
        this.scoreBestPosition = document.querySelector(".score_best_value");
        this.scoreValue        = 0;
        
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
