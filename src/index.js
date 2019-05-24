import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//squareは正方形のマス目　クラスコンポーネント
//子コンポーネント
class Square extends React.Component {
  //steteを使用するためにコンストラクタを定義する。
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    //Square（マス目）コンポーネントは 1 つの <button> をレンダー
    return (
      <button
        className="square"
        //ここで状態を保存している
        onClick={() => this.setState({ value: 'X' })}
      >
        {this.state.value}
      </button>
    );
  }
}
//盤面のクラスコンポーネント
//BoardコンポーネントはSquareコンポーネントの親コンポーネント
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      square: Array(9).fill(null)
    }
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
    const status = 'Next player: X';

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
