import { Input, Loader } from "components";
import Select from "components/select";
import { config } from "config";
import { ChangeEventHandler, Component, FormEventHandler, HTMLInputTypeAttribute } from "react";
import { toast } from "react-hot-toast";
import { Genre, } from "services";
import { IEntity } from "types";

interface NewMovieState {
	name: string;
	isLoading: boolean;
	isCreating: boolean;
}

interface NewMovieProps {
	onNavigate: (pathname: string) => void;
}

export default class NewGenre extends Component<NewMovieProps, NewMovieState> {
	state: NewMovieState = {
		name: "",
		isLoading: true,
		isCreating: false,
	};

	handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();
		this.setState({ isCreating: true });

		const { name, } = this.state;
		try {
			const accessToken = localStorage.getItem(config.tokenKEY)!;
   await Genre.Create({
				name,
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


render() {
		const { isLoading, isCreating } = this.state;
		// if (isLoading) return <Loader />;

		return (
			<>
				<h1>Create Genre</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("name", "Name")}
					<button className="btn btn-primary" disabled={isCreating}>
						Save
					</button>
				</form>
			</>
		);
	}
}
