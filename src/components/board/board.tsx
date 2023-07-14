import { AppState } from "../../App";
import cls from "./board.module.scss";

export interface BoardProps extends Pick<AppState, "board"> {
	onCell: (idx: number) => void;
	onReset: () => void;
}

export default function Board({ board, onCell, onReset }: BoardProps) {
	return (
		<div className={cls.board}>
			{board.map((board, idx) => (
				<button key={idx} onClick={() => onCell(idx)} className={cls.cell}>
					{board}
				</button>
			))}
			<button className={cls.reset} onClick={onReset}>reset</button>
		</div>
	);
}
