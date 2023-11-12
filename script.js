// import Field from "./Field.js";
// import Snake from "./Snake.js";
// import Apple from "./Apple.js";
// import Score from "./Score.js";

const field             = document.querySelector(".game_field");
const scorePosition     = document.querySelector(".score_value");
const scoreBestPosition = document.querySelector(".score_best_value");
const gameOverPosition  = document.querySelector(".game_over");
const directions        = {up: "up", down: "down", left: "left", right: "right"};
let   direction      = directions.left;
let   snakeArr       = [[5, 5], [6, 5]];
let   appleArr       = [];
let   scoreValue     = 0;
let   stopInterval   = 0;

gameStartFunc()

document.addEventListener("keydown", function(event) {              // ждем нажатие стрелки
    switch (event.key) {
        case 'ArrowRight':
            if (direction != directions.left) {
                direction = directions.right;
            }
            break;
        case 'ArrowLeft':
            if (direction != directions.right) {
                direction = directions.left;
            }
            break;
        case 'ArrowUp':
            if (direction != directions.down) {
                direction = directions.up;
            }
            break;
        case 'ArrowDown': 
            if (direction != directions.up) {
                direction = directions.down;
        }
            break;
    }
});


function gameStartFunc() {
    direction    = directions.left;
    snakeArr     = [[5, 5], [6, 5]];
    appleArr     = [];
    scoreValue   = 0;
    stopInterval = 0;

    if (localStorage.getItem("scoreBestValue") != null) {                       // если не первый запуск, читаем лучший результат из хранилища
        scoreBestPosition.textContent = localStorage.getItem("scoreBestValue");
    } else {
        localStorage.setItem("scoreBestValue", scoreValue.toString());          // если первый запуск, записываем в хранилище - 0
    }
        
    scorePosition.textContent = scoreValue;
    
    while (field.firstChild) {                                                  // удаляем дочерние элементы поля
        field.removeChild(field.firstChild);
    } 

    gameOverPosition.removeAttribute("style");
    gameOverPosition.textContent = "";

    drawField()                                                                  // рисуем поле
    snakeGrowingFunc()                                                           // рисуем змейку
    AppleRandomCoord()                                                           // рисуем яблоко

    stopInterval = setInterval(snakeMove, 400);

}

function snakeMove() {                                              // функция движения змейки
    switch (direction) {
    case directions.right:
        snakeArr.splice(0, 0, [snakeArr[0][0]+1, snakeArr[0][1]]);
        break;
    case directions.left:
        snakeArr.splice(0, 0, [snakeArr[0][0]-1, snakeArr[0][1]]);
        break;
    case directions.up:
        snakeArr.splice(0, 0, [snakeArr[0][0], snakeArr[0][1]-1]);
        break;
    case directions.down: 
        snakeArr.splice(0, 0, [snakeArr[0][0], snakeArr[0][1]+1]);    
        break;
    }
    
    if ((snakeArr[0][0] <= 10) && (snakeArr[0][0] >= 1) && (snakeArr[0][1] >= 1) && (snakeArr[0][1] <= 10)) {
        let snake = field.querySelector(`[data-x="${snakeArr[0][0]}"][data-y="${snakeArr[0][1]}"]`);
        if (snake.classList.contains("snake_body_element")) {
            gameOver("Нельзя наезжать на свой хвост))")
        }
        if ((snakeArr[0][0] == appleArr[0]) && (snakeArr[0][1] == appleArr[1])) {
            scoreValueShow()
            snakeGrowingFunc(false);
        } else {
            snakeGrowingFunc(true);
        }
    } else {
        gameOver("Нельзя выходить за пределы игрового поля")
    }
}

function snakeGrowingFunc(SnakeEndDelete) {                  // функция отрисовки змейки
    let i = true;
    snakeArr.forEach(item => {
        let snake = field.querySelector(`[data-x="${item[0]}"][data-y="${item[1]}"]`);
        if (i) {
            snake.className = "snake_head_element";
            i = false;
        } else {
            snake.className = "snake_body_element";
        }
    })
    if (SnakeEndDelete) {
        let snakeEnd = snakeArr.pop()
        let snake = field.querySelector(`[data-x="${snakeEnd[0]}"][data-y="${snakeEnd[1]}"]`);
        snake.className = "field_element";
    }
}

function AppleRandomCoord() {                               // функция генерации яблока
    let i = true;
    while (i) {
        appleArr[0] = Math.floor(Math.random() * 9 + 1);
        appleArr[1] = Math.ceil (Math.random() * 9 + 1);
        apple = field.querySelector(`[data-x="${appleArr[0]}"][data-y="${appleArr[1]}"]`);
        if (!apple.classList.contains("snake_head_element") && !apple.classList.contains("snake_body_element")) {
            apple.className = "apple_element";
            i = false;
        }
    }
}

function scoreValueShow() {
    scoreValue += 1;
    scorePosition.textContent = scoreValue;
    scoreBestPosition.textContent = localStorage.getItem("scoreBestValue");
    
    if (scoreValue >= localStorage.getItem("scoreBestValue")) {
        localStorage.setItem("scoreBestValue", scoreValue.toString());                 // записываем результат в локальное хранилище
        scoreBestPosition.textContent = localStorage.getItem("scoreBestValue");
    } 

    AppleRandomCoord()                               // рисуем новое яблоко
}

function gameOver(overReason) {                                      // функция конец игры
    clearInterval(stopInterval);
    gameOverPosition.textContent = `ВСЕ ... КОНЕЦ...))\n${overReason}`;
    gameOverPosition.style.backgroundColor = "rgb(255, 255, 0, 0.9)";
    gameOverPosition.style.boxShadow = "10px 10px 30px 2px #c5c0c0";
    
    let gameOverBtn = document.createElement("button");
    gameOverBtn.classList.add("btn_clear");
    gameOverBtn.textContent = "НАЧАТЬ ЗАНОВО";
    gameOverPosition.appendChild(gameOverBtn);

    clearBestScore();                                           // рисуем чек-бокс

    gameOverBtn.addEventListener("click", function(event) {      
        if (document.querySelector("#checkcross").checked) {
            localStorage.setItem("scoreBestValue", 0);
        }
        gameStartFunc()
    });
}

function drawField() {                                  // функция рисования чистого поля
    let x = y = 1;
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
    
        field.appendChild(divFild);
    }
}

function clearBestScore() {                                         // создаем чекбокс для сброса лучшего результата
    let clearBestScoreWrapper = document.createElement("div");
        clearBestScoreWrapper.classList.add("toggle-wrapper");
        clearBestScoreWrapper.textContent = "Удалить лучший результат?"
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

// class Script {
//     constructor() {
//         this.drowField = new Field(field);
//         this.snakeMove = new Snake();

//     }



// }
// export default Script;