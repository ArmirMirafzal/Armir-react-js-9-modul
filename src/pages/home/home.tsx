import { Component } from "react";
import { Genres, Movies } from "./components";
import { IEntity } from "types";
import { Genre, Movie } from "services";
import { Loader } from "components";
import { paginate } from "utils";
import Pagination from "./components/pagination";

interface HomeState {
	movies: IEntity.Movie[];
	genres: IEntity.Genre[];
	isLoading: boolean;
	genreID: string;
	search: string;
	pageSize: number;
	currentPage: number;
}

interface HomeProps {
	user: IEntity.User;
	onNavigate: (pathname: string) => void;
}

export default class Home extends Component<HomeProps, HomeState> {
	state: HomeState = {
		movies: [],
		genres: [],
		isLoading: true,
		genreID: "all",
		search: "",
		pageSize: 3,
		currentPage: 1,
	};

	handleSelectGenre = (genreID: string) => {
		this.setState({ genreID, currentPage: 1 });
	};

	handleChangeSearch = (search: string) => {
		this.setState({ search });
	};

	handleChangePage = (currentPage: number) => {
		this.setState({ currentPage });
	};

	async componentDidMount() {
		const { data: movies } = await Movie.List();
		const { data: genres } = await Genre.List();
		const { data: movie } = await Movie.Single({ movieID: movies[0]._id });
		console.log("movie = ", movie);

		this.setState({
			movies,
			genres: [{ _id: "all", name: "All Genres" }, ...genres],
			isLoading: false,
		});
	}

	filteredItems = () => {
		const { movies, genreID, search, currentPage, pageSize } = this.state;

		const filteredMovies =
			genreID === "all" ? movies : movies.filter((movie) => movie.genre._id === genreID);

		const searchedMovies = filteredMovies.filter((movie) =>
			movie.title.toLowerCase().includes(search.toLowerCase())
		);

		const paginatedMovies = paginate(searchedMovies, currentPage, pageSize);
		return { paginatedMovies, searchedMovies };
	};

	render() {
		if (this.state.isLoading) return <Loader />;

		const { genres, genreID, search, currentPage, pageSize } = this.state;
		const { user, onNavigate } = this.props;

		const { paginatedMovies, searchedMovies } = this.filteredItems();

		return (
			<div className="row">
				<div className="col-2">
					<Genres genreID={genreID} genres={genres} onSelectGenre={this.handleSelectGenre} />
				</div>
				<div className="col">
					{user && (
						<button className="btn btn-primary mb-4" onClick={() => onNavigate("/new-movie")}>
							New Movie
						</button>
					)}
					<Movies
						search={search}
						movies={paginatedMovies}
						onChangeSearch={this.handleChangeSearch}
					/>
					<Pagination
						amount={searchedMovies.length}
						currentPage={currentPage}
						pageSize={pageSize}
						onChangePage={this.handleChangePage}
					/>
				</div>
			</div>
		);
	}
}
