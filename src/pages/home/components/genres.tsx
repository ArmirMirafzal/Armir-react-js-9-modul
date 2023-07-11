import { IEntity } from "types";

interface GenresProps {
	genres: IEntity.Genre[];
	genreID: string;
	onSelectGenre: (newGenreID: string) => void;
}

const Genres = ({ genres, genreID, onSelectGenre }: GenresProps) => (
	<ul className="list-group">
		{genres.map((genre) => (
			<li
				key={genre._id}
				onClick={() => onSelectGenre(genre._id)}
				className={`list-group-item ${genre._id === genreID ? "active" : ""}`}
			>
				{genre.name}
			</li>
		))}
	</ul>
);

export default Genres;
