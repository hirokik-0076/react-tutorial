import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//squareは正方形のマス目　クラスコンポーネント
//子コンポーネント
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
//盤面のクラスコンポーネント
//BoardコンポーネントはSquareコンポーネントの親コンポーネント
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //真偽値が反転されXかOが表示される様になっている
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      //setStateでxIsNextの真偽値を反転させている。
      xIsNext: !this.state.xIsNext,
    });
  }
  //Board（盤面）が 9 個のマス目をレンダー
  renderSquare(i) {
    //propsとしてvalueという名前の値をSquareに渡す様にしている
    return (
      <Square
        value={this.state.squares[i]}
        //マス目をクリックした時に呼ばれる関数
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    //勝者を定義
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      //勝者を記述
      status = 'Winner: ' + winner;
    } else {
      //playerの手番を表示
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//Gameのクラスコンポーネント
class Game extends React.Component {
  render() {
    //Game コンポーネントは盤面と、後ほど埋めることになるプレースホルダーを描画しています。
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
//勝者を決める関数
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
