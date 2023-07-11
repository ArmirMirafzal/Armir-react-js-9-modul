import { Component, FormEventHandler } from "react";

interface LoginState {
	username: string;
	password: string;
}

export default class Login extends Component<{}, LoginState> {
	state: LoginState = {
		username: "",
		password: "",
	};

	handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		console.log("data = ", this.state);
		
	};

	renderInput = (name: keyof LoginState, label: string, type = "text") => {
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
						const state = {} as LoginState;
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
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					<button className="btn btn-primary">Login</button>
				</form>
			</>
		);
	}
}
