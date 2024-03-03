import React, { Component } from 'react';
import Cell from './Cell';
import MovesCounter from './MovesCunter';
import GameTimer from './GameTimer';
import styles from './Board.module.css';

class Board extends Component {
    static defaultProps = {
        boardWidth: 5
    }
    constructor(props) {
        super(props);
        this.state = {
            moves: 0,
            hasWon: false,
            cells: this.initializeBoard()
        };
        this.timerRef = React.createRef();
        this.flipCellsAround = this.flipCellsAround.bind(this);
        this.newGame = this.newGame.bind(this);
    }
    initializeBoard() {
        const arrLength = this.props.boardWidth * this.props.boardWidth;
        const arr = new Array(arrLength);
        for(let i = 0; i < arr.length; i++) {
            arr[i] = this.randomBoolean();
        }
        return arr;
    }
    randomBoolean() {
        return Math.random() >= 0.5;
    }
    flipCellsAround(idx) {
        idx = +idx;
        const updatedCells = this.state.cells;
        updatedCells[idx] = !updatedCells[idx];

        if(idx - this.props.boardWidth >= 0)
            updatedCells[idx - this.props.boardWidth] = !updatedCells[idx - this.props.boardWidth];
        
        if(idx + this.props.boardWidth <= this.state.cells.length - 1)
            updatedCells[idx + this.props.boardWidth] = !updatedCells[idx + this.props.boardWidth];
        
        if(idx - 1 >= 0 && idx % 5 !== 0)
            updatedCells[idx - 1] = !updatedCells[idx - 1];
            
        if(idx + 1 <= this.state.cells.length - 1 && (idx + 1) % 5 !== 0)
            updatedCells[idx + 1] = !updatedCells[idx + 1];
            
        const hasWon = updatedCells.every(cell => !cell);
        this.setState(st => ({ moves: st.moves + 1, hasWon: hasWon, cells: updatedCells }));
    }
    newGame() {
        this.timerRef.current.startNewCountUp();
        this.setState({
            moves: 0,
            hasWon: false,
            cells: this.initializeBoard()
        });
    }
    render() {
        let content;
        if(this.state.hasWon) {
            content = <h3>You Win!!!</h3>
        } else {
            content = <>
                        <h3>Lights Out</h3>
                        <div className={styles.board}>
                            {this.state.cells.map((cell, index) => (<Cell click={this.flipCellsAround} key={index} id={index} isOn={cell} />))}
                        </div>
                    </>
        }
        return (<>
            {content}
            <div className={styles["game-info"]}>
                <MovesCounter moves={this.state.moves} />
                <GameTimer ref={this.timerRef} isEndOfGame={this.state.hasWon} />
            </div>
            <button onClick={this.newGame} className={styles.btn}>New Game</button>
        </>)
    }
}

export default Board;