import { IEntity } from "types";
import MoviesTable from "./movies-table";

interface MoviesProps {
	movies: IEntity.Movie[];
	moviesLength: IEntity.Movie[];
	filteredMovies: IEntity.Movie[];
	search: string;
	genreID: string;
	onChangeSearch: (search: string) => void;
}

const Movies = ({ onChangeSearch, search, movies, moviesLength, genreID, filteredMovies }: MoviesProps) => (
	<>
		<p>Showing {genreID !== "all" ? filteredMovies.length : moviesLength.length} movies in the database.</p>
		<input
			value={search}
			type="text"
			placeholder="Search...."
			className="form-control my-3"
			onChange={(e) => onChangeSearch(e.target.value)}
		/>
		<MoviesTable movies={movies} />
	</>
);

export default Movies;
