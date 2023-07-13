import { Input, Loader } from "components";
import Select from "components/select";
import { config } from "config";
import { ChangeEventHandler, Component, FormEventHandler, HTMLInputTypeAttribute } from "react";
import { toast } from "react-hot-toast";
import { Genre, Movie } from "services";
import { IEntity } from "types";
import { delay } from "utils";

interface NewMovieState {
	title: string;
	genreId: string;
	stock: string;
	rate: string;
	genres: IEntity.Genre[];
	isLoading: boolean;
	isCreating: boolean;
}

interface NewMovieProps {
	onNavigate: (pathname: string) => void;
}

export default class NewMovie extends Component<NewMovieProps, NewMovieState> {
	state: NewMovieState = {
		title: "",
		genreId: "",
		stock: "",
		rate: "",
		genres: [],
		isLoading: true,
		isCreating: false,
	};

	handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();
		this.setState({ isCreating: true });

		const { title, genreId, rate, stock } = this.state;
		try {
			const accessToken = localStorage.getItem(config.tokenKEY)!;
			await Movie.Create({
				title,
				genreId,
				dailyRentalRate: +rate,
				numberInStock: +stock,
				accessToken,
			});
			this.props.onNavigate("/");
		} catch (err: any) {
			toast.error(err?.response?.data);
		} finally {
			this.setState({ isCreating: false });
		}
	};

	handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
		this.setState({ [e.target.name]: e.target.value } as unknown as NewMovieState);
	};

	renderInput = (name: keyof NewMovieState, label: string, type?: HTMLInputTypeAttribute) => (
		<Input
			name={name}
			label={label}
			type={type}
			value={this.state[name] as string}
			onChange={this.handleChange}
		/>
	);

	renderSelect = (name: keyof NewMovieState, label: string, options: IEntity.Genre[]) => (
		<Select
			name={name}
			label={label}
			value={this.state[name] as string}
			onChange={this.handleChange}
			options={options}
		/>
	);

	async componentDidMount() {
		const { data: genres } = await Genre.List();

		await delay();
		this.setState({ genres, isLoading: false });
	}

	render() {
		const { isLoading, genres, isCreating } = this.state;
		if (isLoading) return <Loader />;

		return (
			<>
				<h1>Create Movie</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelect("genreId", "Select Movie Genre", genres)}
					{this.renderInput("stock", "Number in Stock", "number")}
					{this.renderInput("rate", "Rate", "number")}
					<button className="btn btn-primary" disabled={isCreating}>
						Save
					</button>
				</form>
			</>
		);
	}
}
