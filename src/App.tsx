import { Component } from "react";
import { Board, Histories } from "./components";

import cls from "./app.module.scss";

type Player = "X" | "O";

type TBoard = (Player | null)[];

export interface AppState {
	board: TBoard;
	histories: TBoard[];
	nextPlayer: Player;
	winner?: Player;
	currentIdx: number;
}

export default class App extends Component<{}, AppState> {
	constructor(props = {}) {
		super(props);
		this.state = JSON.parse(localStorage.getItem("state")!) || {
			board: new Array(9).fill(null),
			histories: [new Array(9).fill(null)],
			nextPlayer: "X",
			currentIdx: 0,
		};
	}

	setStateStorage: typeof this.setState = (state) => {
		this.setState(state, () => {
			localStorage.setItem("state", JSON.stringify(this.state));
		});
	};

	checkWinner = (board: TBoard) => {
		const winningPositions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < winningPositions.length; i++) {
			const [x, y, z] = winningPositions[i];

			if (board[x] && board[x] === board[y] && board[y] === board[z]) {
				return board[x];
			}
		}
	};

	handleCell = (idx: number) => {
		let { nextPlayer, histories, currentIdx } = this.state;
		const board = [...this.state.board];

		if (this.checkWinner(board) || board[idx]) return;
		board[idx] = nextPlayer;
		nextPlayer = nextPlayer === "X" ? "O" : "X";

		this.setStateStorage({
			board,
			nextPlayer,
			histories: [...histories.splice(0, currentIdx + 1), board],
			currentIdx: currentIdx + 1,
		});
	};

	handleHistory = (idx: number) => {
		const { histories } = this.state;
		const board = [...histories[idx]];

		this.setStateStorage({ board, currentIdx: idx });
	};

	handleReset = () => {
		localStorage.removeItem("state");
		this.setState({
			board: new Array(9).fill(null),
			histories: [new Array(9).fill(null)],
			nextPlayer: "X",
			currentIdx: 0,
		});
	};

	render() {
		const { board, nextPlayer, histories, currentIdx, winner } = this.state;

		return (
			<main className={cls.container}>
				<Board board={board} onCell={this.handleCell} onReset={this.handleReset} />
				<Histories
					onHistory={this.handleHistory}
					winner={winner}
					currentIdx={currentIdx}
					nextPlayer={nextPlayer}
					histories={histories}
				/>
			</main>
		);
	}
}
