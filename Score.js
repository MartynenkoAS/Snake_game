class Score {
    constructor() {
        this.scorePosition     = document.querySelector(".score_value");
        this.scoreBestPosition = document.querySelector(".score_best_value");
        this.gameOverPosition  = document.querySelector(".game_over");
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

    gameOver(overReason, stopInt) {                                                  // метод конец игры
        clearInterval(stopInt);
        this.gameOverPosition.textContent = `ВСЕ ... КОНЕЦ...))\n${overReason}`;
        this.gameOverPosition.style.backgroundColor = "rgb(255, 255, 0, 0.9)";
        this.gameOverPosition.style.boxShadow = "10px 10px 30px 2px #c5c0c0";
        
        let gameOverBtn = document.createElement("button");
        gameOverBtn.classList.add("btn_clear");
        gameOverBtn.textContent = "НАЧАТЬ ЗАНОВО";
        this.gameOverPosition.appendChild(gameOverBtn);
    
        this.clearBestScore();                                                   // рисуем чек-бокс
    
        gameOverBtn.addEventListener("click", this.gameOverBthPress);
    }

        gameOverBthPress(event) {      
            if (document.querySelector("#checkcross").checked) {
                localStorage.setItem("scoreBestValue", 0);
            }
            gameStartFunc() //---------------------------------------------------------ВОТ ТУТ НАДО ВЫЗЫВАТЬ ФУНКЦИЮ ИЗ Script.js----------------------
        }
    
    clearBestScore() {                                               // создаем чекбокс для сброса лучшего результата
        let clearBestScoreWrapper = document.createElement("div");
            clearBestScoreWrapper.classList.add("toggle-wrapper");
            clearBestScoreWrapper.textContent = "Очистить лучший результат?"
            this.gameOverPosition.appendChild(clearBestScoreWrapper);
            const clearBestScoreWrapperPosition = document.querySelector(".toggle-wrapper");
    
            let clearBestScoreToggle = document.createElement("div");
                clearBestScoreToggle.classList.add("toggle", "checkcross");
                clearBestScoreWrapperPosition.appendChild(clearBestScoreToggle);
                const clearBestScoreTogglePosition = document.querySelector(".toggle");
    
                    let clearBestScoreInput = document.createElement("input");
                        // clearBestScoreInput.classList.add("clr_check");
                        clearBestScoreInput.setAttribute("type", "checkbox");
                        clearBestScoreInput.setAttribute("id", "checkcross");
                        clearBestScoreTogglePosition.appendChild(clearBestScoreInput);
    
                    let clearBestScoreLabel = document.createElement("label");
                        clearBestScoreLabel.classList.add("toggle-item");
                        clearBestScoreLabel.setAttribute("for", "checkcross");
                        clearBestScoreTogglePosition.appendChild(clearBestScoreLabel);
                        const clearBestScoreLabelPosition = document.querySelector(".toggle-item");
    
                        let clearBestScoreCheck = document.createElement("div");
                            clearBestScoreCheck.classList.add("check");
                            clearBestScoreLabelPosition.appendChild(clearBestScoreCheck);
    }

}
export default Score;
