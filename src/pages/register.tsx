import { Component, FormEventHandler } from "react";
import { toast } from "react-hot-toast";
import { Auth } from "services";

interface RegisterState {
	username: string;
	password: string;
	name: string;
}

export default class Register extends Component<{}, RegisterState> {
	state: RegisterState = {
		username: "",
		password: "",
		name: "",
	};

	handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();
		try {
			const { data } = await Auth.Register({
				name: this.state.name,
				email: this.state.username,
				password: this.state.password,
			});

			console.log("data = ", data);
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	renderInput = (name: keyof RegisterState, label: string, type = "text") => {
		const value = this.state[name];

		return (
			<div className="form-group">
				<label htmlFor={name}>{label}</label>
				<input
					type={type}
					id={name}
					name={name}
					className="form-control"
					value={value}
					onChange={(e) => {
						const state = {} as RegisterState;
						state[name] = e.target.value;

						this.setState(state);
					}}
				/>
			</div>
		);
	};

	render() {
		return (
			<>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("name", "Name")}
					{this.renderInput("password", "Password", "password")}
					<button className="btn btn-primary">Register</button>
				</form>
			</>
		);
	}
}
