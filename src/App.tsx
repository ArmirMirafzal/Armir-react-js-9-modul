// import { Component, useState } from "react";
// import { Board, Histories } from "./components";

// import cls from "./app.module.scss";

// type Player = "X" | "O";

// type TBoard = (Player | null)[];

// export interface AppState {
// 	board: TBoard;
// 	histories: TBoard[];
// 	nextPlayer: Player;
// 	winner?: Player;
// 	currentIdx: number;
// }

// export default class App extends Component<{}, AppState> {
// 	constructor(props = {}) {
// 		super(props);
// 		this.state = JSON.parse(localStorage.getItem("state")!) || {
// 			board: new Array(9).fill(null),
// 			histories: [new Array(9).fill(null)],
// 			nextPlayer: "X",
// 			currentIdx: 0,
// 		};
// 	}

// 	setStateStorage: typeof this.setState = (state) => {
// 		this.setState(state, () => {
// 			localStorage.setItem("state", JSON.stringify(this.state));
// 		});
// 	};

// 	checkWinner = (board: TBoard) => {
// 		const winningPositions = [
// 			[0, 1, 2],
// 			[3, 4, 5],
// 			[6, 7, 8],
// 			[0, 3, 6],
// 			[1, 4, 7],
// 			[2, 5, 8],
// 			[0, 4, 8],
// 			[2, 4, 6],
// 		];

// 		for (let i = 0; i < winningPositions.length; i++) {
// 			const [x, y, z] = winningPositions[i];

// 			if (board[x] && board[x] === board[y] && board[y] === board[z]) {
// 				return board[x];
// 			}
// 		}
// 	};

// 	handleCell = (idx: number) => {
// 		let { nextPlayer, histories, currentIdx } = this.state;
// 		const board = [...this.state.board];

// 		if (this.checkWinner(board) || board[idx]) return;
// 		board[idx] = nextPlayer;
// 		nextPlayer = nextPlayer === "X" ? "O" : "X";

// 		this.setStateStorage({
// 			board,
// 			nextPlayer,
// 			histories: [...histories.splice(0, currentIdx + 1), board],
// 			currentIdx: currentIdx + 1,
// 		});
// 	};

// 	handleHistory = (idx: number) => {
// 		const { histories } = this.state;
// 		const board = [...histories[idx]];

// 		this.setStateStorage({ board, currentIdx: idx });
// 	};

// 	handleReset = () => {
// 		localStorage.removeItem("state");
// 		this.setState({
// 			board: new Array(9).fill(null),
// 			histories: [new Array(9).fill(null)],
// 			nextPlayer: "X",
// 			currentIdx: 0,
// 		});
// 	};

// 	render() {
// 		const { board, nextPlayer, histories, currentIdx, winner } = this.state;

// 		return (
// 			<main className={cls.container}>
// 				<Board board={board} onCell={this.handleCell} onReset={this.handleReset} />
// 				<Histories
// 					onHistory={this.handleHistory}
// 					winner={winner}
// 					currentIdx={currentIdx}
// 					nextPlayer={nextPlayer}
// 					histories={histories}
// 				/>
// 			</main>
// 		);
// 	}
// }

import { useState } from "react";
import { Player, TBoard } from "type";

import { Board, Histories } from "./components";

const players: Record<Player, Player> = {
  X: "O",
  O: "X",
};

export default function App() {
  const [board, setBoard] = useState<TBoard>(new Array(9).fill(null));
  const [histories, setHistories] = useState<TBoard[]>([new Array(9).fill(null)]);
  const [nextPlayer, setNextPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player>("X");
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  setBoard(JSON.parse(localStorage.getItem("game")!) || { board: new Array(9).fill(null) });
  setHistories(JSON.parse(localStorage.getItem("game")!) || { histories: [new Array(9).fill(null)] });
  setNextPlayer(JSON.parse(localStorage.getItem("game")!) || { nextPlayer: "X" });
  setHistories(JSON.parse(localStorage.getItem("game")!) || { winner: "X" });
  setCurrentIdx(JSON.parse(localStorage.getItem("game")!) || { currentIdx: 0 });

  const game = [{ board, histories, nextPlayer, winner, currentIdx }];

  localStorage.setItem("game", JSON.stringify(game));

  function checkWinner(board: TBoard) {
    const positions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let position of positions) {
      const [x, y, z] = position;
      console.log(position);

      if (board[x] === board[y] && board[y] === board[z]) {
        console.log("positions", board[x], board[y], board[z]);
        console.log("winner =", board[x]);

        return board[x];
      }
    }
  }

  const handleCell = (idx: number) => {
    const newBoard = [...board];
    console.log(newBoard);

    if (checkWinner(newBoard) || newBoard[idx]) return;

    newBoard[idx] = nextPlayer;

    setBoard(newBoard);
    setNextPlayer(players[nextPlayer]);
    setHistories([...histories.slice(0, currentIdx + 1), board]);
    setCurrentIdx(currentIdx + 1);
    setWinner(checkWinner(board)!);
  };

  const handleHistory = (idx: number) => {
    const board = [...histories[idx]];
    const currentWinner = winner === "O" ? "O" : "X";

    setBoard(board);
    setCurrentIdx(idx);
    setWinner(winner && (idx === histories.length ? currentWinner : null!));
  };

  const handleReset = () => {
    localStorage.removeItem("game");
    setBoard(new Array(9).fill(null));
    setNextPlayer("X");
    setHistories([new Array(9).fill(null)]);
    setCurrentIdx(0);
    setWinner("X");
  };

  return (
    <div className="container" style={{ display: "flex", alignItems: "flex-start", margin: 20, gap: 40 }}>
      <Board onReset={handleReset} board={board} onCell={handleCell} />
      <Histories onHistory={handleHistory} currentIdx={currentIdx} nextPlayer={nextPlayer} histories={histories} />
    </div>
  );
}