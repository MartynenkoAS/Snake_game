import Field from "./Field.js";
import Apple from "./Apple.js";
import Score from "./Score.js";
import Snake from "./Snake.js";

const fieldClass = new Field();
const appleClass = new Apple();
const scoreClass = new Score();
let stopInterval = 0;
const snakeClass = new Snake(fieldClass.field, appleClass.appleArr, scoreClass, appleClass, stopInterval);

gameStartFunc()

function gameStartFunc() {
    snakeClass.direction  = snakeClass.directions.left;
    snakeClass.snakeArr   = [[5, 5], [6, 5]];
    scoreClass.scoreValue = 0;
    let stopInterval = 0;

    if (localStorage.getItem("scoreBestValue") != null) {                       // если не первый запуск, читаем лучший результат из хранилища
        scoreClass.scoreBestPosition.textContent = localStorage.getItem("scoreBestValue");
    } else {
        localStorage.setItem("scoreBestValue", scoreValue.toString());          // если первый запуск, записываем в хранилище - 0
    }
        
    scoreClass.scorePosition.textContent = scoreClass.scoreValue;
    
    scoreClass.gameOverPosition.removeAttribute("style");
    scoreClass.gameOverPosition.textContent = "";

    fieldClass.drawField()                                                       // рисуем поле из класса Field
    snakeClass.snakeGrowingFunc(false)                                           // рисуем змейку из класса Snake
    appleClass.appleRandomCoord(fieldClass.field)                                // рисуем яблоко из класса Apple

    stopInterval = setInterval(() => {
        snakeClass.snakeMove()
    }, 400);
}

snakeClass.snakeControll();
