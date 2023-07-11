import { IEntity } from "types";

interface MoviesTableProps {
	movies: IEntity.Movie[];
}

const MoviesTable = ({ movies }: MoviesTableProps) => (
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
					<td>{movie.title}</td>
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
