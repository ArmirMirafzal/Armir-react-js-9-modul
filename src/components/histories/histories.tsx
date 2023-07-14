import { Player, TBoard } from "type";
import cls from "./histories.module.scss";
import cx from "classnames";

export interface HistoriesProps {
  histories: TBoard[];
  nextPlayer: Player;
  currentIdx: number;
  onHistory: (idx: number) => void;
}

export default function Histories({ nextPlayer, histories, currentIdx, onHistory }: HistoriesProps) {
  return (
    <div className={cls.histories}>
      <h2 className={cls.title}>{`Next Player: ${nextPlayer}`}</h2>
      <ol className={cls.historiesList}>
        {histories.map((history, idx) => (
          <li key={idx} className={cls.history}>
            <button onClick={() => onHistory(idx)} className={cx(cls.historyBtn, currentIdx === idx ? cls.active : "")}>
              Go to {!idx ? `game start` : `move #${idx}`} {currentIdx === idx ? "(current)" : ""}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}