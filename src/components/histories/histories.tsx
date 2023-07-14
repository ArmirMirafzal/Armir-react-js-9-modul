import { AppState } from "../../App";

import cls from "./histories.module.scss";

interface HistoriesProps
	extends Pick<AppState, "histories" | "nextPlayer" | "currentIdx" | "winner"> {
	onHistory: (idx: number) => void;
}

export default function Histories({
	nextPlayer,
	histories,
	currentIdx,
	winner,
	onHistory,
}: HistoriesProps) {
	return (
		<div className="ms-2">
			<h2>{winner ? `Winner ${winner}` : `Next player: ${nextPlayer}`}</h2>
			<div className={cls.histories} style={{ gap: 2 }}>
				{histories.map((h, idx) => (
					<button key={idx} onClick={() => onHistory(idx)} disabled={currentIdx === idx}>
						Go to {idx ? `move #${idx}` : "game start"}
					</button>
				))}
			</div>
		</div>
	);
}
