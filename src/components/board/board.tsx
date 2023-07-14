import { TBoard } from "type";
import cls from "./board.module.scss";

export interface BoardProps {
  board: TBoard;
  onCell: (idx: number) => void;
  onReset: () => void;
}

export default function Board({ board, onCell, onReset }: BoardProps) {
  return (
    <div className={cls.game}>
      <div className={cls.board}>
        {board.map((item, idx) => (
          <button key={idx} onClick={() => onCell(idx)} className={cls.cell}>
            {item}
          </button>
        ))}
      </div>
      <button onClick={onReset} className={cls.reset} children="Reset"></button>
    </div>
  );
}