import Field from "./Field.js";
import Apple from "./Apple.js";
import Score from "./Score.js";
import Snake from "./Snake.js";

const fieldClass = new Field();
const appleClass = new Apple();
const scoreClass = new Score();
const snakeClass = new Snake(fieldClass.field, appleClass.appleArr, scoreClass, appleClass);
const gameOverPosition = document.querySelector(".game_over");
let   stopInterval     = 0;

gameStartFunc()

function gameStartFunc() {
    snakeClass.direction  = snakeClass.directions.left;
    snakeClass.snakeArr   = [[5, 5], [6, 5]];
    scoreClass.scoreValue = 0;
    // let stopInterval = 0;

    if (localStorage.getItem("scoreBestValue") != null) {                       // если не первый запуск, читаем лучший результат из хранилища
        scoreClass.scoreBestPosition.textContent = localStorage.getItem("scoreBestValue");
    } else {
        localStorage.setItem("scoreBestValue", scoreValue.toString());          // если первый запуск, записываем в хранилище - 0
    }
        
    scoreClass.scorePosition.textContent = scoreClass.scoreValue;
    
    gameOverPosition.removeAttribute("style");
    gameOverPosition.textContent = "";

    fieldClass.drawField()                                                       // рисуем поле из класса Field
    snakeClass.snakeGrowingFunc(false)                                           // рисуем змейку из класса Snake
    appleClass.appleRandomCoord(fieldClass.field)                                // рисуем яблоко из класса Apple

    stopInterval = setInterval(() => {
        let overRsn = snakeClass.snakeMove(stopInterval)
            if (overRsn != "") {
                gameOver(overRsn)
            }
    }, 400);
}

function gameOver(overReason) {                                                  // метод конец игры
    clearInterval(stopInterval);
    gameOverPosition.textContent = `ВСЕ ... КОНЕЦ...))\n${overReason}`;
    gameOverPosition.style.backgroundColor = "rgb(255, 255, 0, 0.9)";
    gameOverPosition.style.boxShadow = "10px 10px 30px 2px #c5c0c0";
    
    clearBestScore();                                                   // рисуем чек-бокс

    let gameOverBtn = document.createElement("button");
        gameOverBtn.classList.add("btn_clear");
        gameOverBtn.textContent = "НАЧАТЬ ЗАНОВО";
        gameOverPosition.appendChild(gameOverBtn);

    gameOverBtn.addEventListener("click", function(event) {      
        if (document.querySelector("#checkcross").checked) {
            localStorage.setItem("scoreBestValue", 0);
        }
        gameStartFunc()
    });
}

function clearBestScore() {                                                                 // создаем чекбокс для сброса лучшего результата. Слегка много "лишнего" кода. 
    let clearBestScoreWrapper = document.createElement("div");                              // Хотел сделать красивый переключатель, но еще не доделал...
        clearBestScoreWrapper.classList.add("toggle-wrapper");
        clearBestScoreWrapper.textContent = "Очистить лучший результат?"
        gameOverPosition.appendChild(clearBestScoreWrapper);
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

snakeClass.snakeControll();
