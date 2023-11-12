class Snake {
    constructor() {
        
        snakeMove() {                                              // функция движения змейки
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

        snakeGrowingFunc(SnakeEndDelete) {                  // функция отрисовки змейки
            let i = true;
            snakeArr.forEach(item => {
                let snake = field.querySelector(`[data-x="${item[0]}"][data-y="${item[1]}"]`);
                if (i) {
                    snake.className = "snake_head_element";
                    i = false;
                } else {
                    snake.className = "snake_body_element";
                }
            });
            if (SnakeEndDelete) {
                let snakeEnd = snakeArr.pop()
                let snake = field.querySelector(`[data-x="${snakeEnd[0]}"][data-y="${snakeEnd[1]}"]`);
                snake.className = "field_element";
            }
        }
        
    }

    
    
}
export default Snake;
