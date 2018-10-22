class Game {
    constructor() {
        this.board = new Board()        
    }
}
class Player {
    calculateWinner(tiles) {
        const status = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let index in status) {
            const [a, b, c] = status[index]
            if (tiles[a].state && tiles[a].state === tiles[b].state && tiles[a].state === tiles[c].state) {
                return status[index]
            }
        }
        return false
    }
    win(values) {
        if (values) {
            values.forEach(value => {
                let span = document.getElementById(value)
                span.style.backgroundColor = '#f9a828'
                span.style.color = '#282f44'
            })
            setTimeout(() => {
                this.whoIsWin(this.blocks[values[0]].state)
            }, 100)
        }
    }
    whoIsWin(value) {
        let winner = document.getElementById('winner')
        let scoreBoard = document.getElementById('scoreBoard')
        winner.innerHTML = value + ' Winner!'
        scoreBoard.style.visibility = 'visible'
        setTimeout(() => {
            winner.classList.add('load')
        }, 300)
        scoreBoard.onclick = () => {
            this.remove()
        }
    }
    draw() {
        let winner = document.getElementById('winner')
        let scoreBoard = document.getElementById('scoreBoard')
        winner.innerHTML = 'DRAW'
        scoreBoard.style.visibility = 'visible'
        setTimeout(() => {
            winner.classList.add('load')
        }, 300)
        scoreBoard.onclick = () => {
            this.remove()
        }
    }
    
}
class Board extends Player{
    constructor() {
        super()
        this.block = 9
        this.restart(this.block)
    }
    restart(block) {
        this.flag = true
        this.full = false
        this.blocks = []
        this.create(block)
    }
    create(block) {
        for (let i = 0; i < block; i++) {
            this.blocks.push(new Block(i))
            document.getElementById(i).onclick = () => {
                this.chooseBlock(i)
            }
        }
    }
    chooseBlock(index) {
        if (this.flag) {
            this.flag = false
            this.blocks[index].state = 'O'
            this.setBlockState(index, 0)
        } else {
            this.flag = true
            this.blocks[index].state = 'X'
            this.setBlockState(index, 1)
        }
        let full = this.isFull(this.blocks)
        let win = this.calculateWinner(this.blocks)
        // check win or draw
        if (full && !win) {
            this.draw()
        } else if (win) {
            this.win(win)
        }
    }
    setBlockState(index, value) {
        let span = document.getElementById(index)
        // for single click in each block
        span.onclick = () => {
            return
        }
        span.classList.add('load')
        setTimeout(() => {
            span.classList.remove('load')
        }, 300)
        if (value) {
            span.innerHTML = '&times'
        } else {
            span.innerHTML = 'O'
        }
    }
    isFull(tiles) {
        this.full = true
        this.blocks.forEach(element => {
            if(element.state == null) this.full = false
        })
        return this.full
    }
    remove() {
        let scoreBoard = document.getElementById('scoreBoard')
        let winner = document.getElementById('winner')
        setTimeout(() => {
            winner.classList.remove('load')
            scoreBoard.style.visibility = 'hidden'
        }, 300)
        let blocks = document.getElementById('blocks')
        setTimeout( () => {
            blocks.innerHTML = ''
            this.restart(this.block)
        },300)
        
    }
}
class Block {
    constructor(index) {
        this.state = null
        this.show(index)
    }
    show(index) {
        let blocks = document.getElementById('blocks')
        let span = document.createElement('span')
        span.innerHTML = this.state
        span.classList.add('item')
        span.id = index
        blocks.appendChild(span)
    }
}
new Game()