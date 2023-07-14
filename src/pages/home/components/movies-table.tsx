import { IEntity } from "types";

interface MoviesTableProps {
	movies: IEntity.Movie[];
	onNavigate: (pathname: string) => void;
}

const MoviesTable = ({ movies, onNavigate }: MoviesTableProps) => (
	<table className="table">
		<thead>
			<tr>
				<th>Title</th>
				<th>Genre</th>
				<th>Owner</th>
				<th>Stock</th>
				<th>Rate</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{movies.map((movie) => (
				<tr key={movie._id}>
					<td>
						<a className="text-decoration-none" href="" onClick={() => onNavigate(`/edit-movie?id=${movie._id}`)}>
							{movie.title}
						</a>
					</td>
					<td>{movie.genre.name}</td>
					<td>{movie.username}</td>
					<td>{movie.numberInStock}</td>
					<td>{movie.dailyRentalRate}</td>
					<td>Like COMP</td>
					<td>
						<button className="btn btn-danger">Delete</button>
					</td>
				</tr>
			))}
		</tbody>
	</table>
);

export default MoviesTable;
