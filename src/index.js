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
  //現時点で Board コンポーネントに必要なのは renderSquare と render メソッドだけです。ゲームの状態と handleClick メソッドは Game コンポーネント内にあります。
  //Board（盤面）が 9 個のマス目をレンダー
  renderSquare(i) {
    //propsとしてvalueという名前の値をSquareに渡す様にしている
    return (
      <Square
        value={this.props.squares[i]}
        //マス目をクリックした時に呼ばれる関数
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  //Gameのコンストラクタで定義したものをBordに渡している
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      //jumpToメソッドで使用するstepNumber
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    //履歴エントリhistoryを追加
    //「時間の巻き戻し」をしてからその時点で新しい着手を起こした場合に、そこから見て「将来」にある履歴（もはや正しくなくなったもの）を確実に捨て去ることができます。
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      //履歴の状態を時系列ごとに追加
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  //jumTo methodを定義
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    //履歴
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    //勝者を定義
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    //Bordに渡す
    let status;
    if (winner) {
      //勝者を記述
      status = 'Winner: ' + winner;
    } else {
      //playerの手番を表示
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
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
