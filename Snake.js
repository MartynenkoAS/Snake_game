class Snake {
    constructor(field, appleArr, scoreMethod, appleMethod) {
        this.directions   = {up: "up", down: "down", left: "left", right: "right"};
        this.snakeArr     = [[5, 5], [6, 5]];
        this._field       = field;
        this._AppleArr    = appleArr;
        this._ScoreMethod = scoreMethod;
        this._AppleMethod = appleMethod;
    }

    snakeGrowingFunc(SnakeEndDelete) {                  // метод отрисовки змейки
        let i = true;
        this.snakeArr.forEach(item => {
            let snake = this._field.querySelector(`[data-x="${item[0]}"][data-y="${item[1]}"]`);
            if (i) {
                snake.className = "snake_head_element";
                i = false;
            } else {
                snake.className = "snake_body_element";
            }
        });
        if (SnakeEndDelete) {
            let snakeEnd    = this.snakeArr.pop()
            let snake       = this._field.querySelector(`[data-x="${snakeEnd[0]}"][data-y="${snakeEnd[1]}"]`);
            snake.className = "field_element";
        }
    }

    snakeMove(stopInt) {                                              // метод движения змейки
        switch (this.direction) {
        case this.directions.right:
            this.snakeArr.splice(0, 0, [this.snakeArr[0][0]+1, this.snakeArr[0][1]]);
            break;
        case this.directions.left:
            this.snakeArr.splice(0, 0, [this.snakeArr[0][0]-1, this.snakeArr[0][1]]);
            break;
        case this.directions.up:
            this.snakeArr.splice(0, 0, [this.snakeArr[0][0], this.snakeArr[0][1]-1]);
            break;
        case this.directions.down: 
            this.snakeArr.splice(0, 0, [this.snakeArr[0][0], this.snakeArr[0][1]+1]);    
            break;
        }
        
        if ((this.snakeArr[0][0] <= 10) && (this.snakeArr[0][0] >= 1) && (this.snakeArr[0][1] >= 1) && (this.snakeArr[0][1] <= 10)) {
            let snake = this._field.querySelector(`[data-x="${this.snakeArr[0][0]}"][data-y="${this.snakeArr[0][1]}"]`);
            if (snake.classList.contains("snake_body_element")) {
                clearInterval(stopInt);
                return "Нельзя наезжать на свой хвост))"
            }
            if ((this.snakeArr[0][0] == this._AppleArr[0]) && (this.snakeArr[0][1] == this._AppleArr[1])) {
                this._ScoreMethod.scoreValueShow()                                                                 // изменяем результат на экране
                this._AppleMethod.appleRandomCoord(this._field)                                                    // рисуем новое яблоко
                this.snakeGrowingFunc(false);
            } else {
                this.snakeGrowingFunc(true);
            }
        } else {
            clearInterval(stopInt);
            return "Нельзя выходить за пределы игрового поля"
        }
        return ""
    }

    snakeControll() {                                                              // метод управления змейкой
        document.addEventListener("keydown", this.switchFunc.bind(this));
    }
    switchFunc(event) {
        switch (event.key) {
            case 'ArrowRight':
                if (this.direction != this.directions.left) {
                    this.direction  = this.directions.right;
                }
                break;
            case 'ArrowLeft':
                if (this.direction != this.directions.right) {
                    this.direction  = this.directions.left;
                }
                break;
            case 'ArrowUp':
                if (this.direction != this.directions.down) {
                    this.direction  = this.directions.up;
                }
                break;
            case 'ArrowDown': 
                if (this.direction != this.directions.up) {
                    this.direction  = this.directions.down;
            }
                break;
        }
    }

}
export default Snake;
