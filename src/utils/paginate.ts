import { IEntity } from "types";

export default function paginate(items: IEntity.Movie[], currentPage: number, pageSize: number) {
	const startIdx = pageSize * (currentPage - 1);
	const finishIdx = startIdx + pageSize;

	return items.slice(startIdx, finishIdx);
}
