import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.30
  }

  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** True or False for cells */
  onOrOff() {
    return (Math.random() < this.props.chanceLightStartsOn) ? true : false;
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    // TODO: create array-of-arrays of true/false values
    let board = [];
    while (board.length < this.props.nrows) {
      let row = Array.from({ length: this.props.ncols }, val => this.onOrOff());
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    let hasWon = this.state.hasWon;

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    let cellsToFlip = [[y, x], [y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]];
    for (let coord of cellsToFlip) {
      flipCell(coord[0], coord[1]);
    }

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let allVals = board.flat();
    if (allVals.every(val => val === false)){
      hasWon = true;
    }
    this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    return (
      // if the game is won, just show a winning msg & render nothing else
      // make table board
      <div>
        {(this.state.hasWon === true) ? <p>You Won</p> : 
        this.state.board.map(
          (row, rIdx) => <tr> {row.map(
            (col, cIdx) => <Cell isLit={col} coords={rIdx + "-" + cIdx}
              flipCellsAroundMe={this.flipCellsAround} />
          )}</tr>)}
      </div>
    )
  }
}


export default Board;
