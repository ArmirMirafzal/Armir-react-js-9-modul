import { Component } from "react";
import { Home, Login, Register } from "pages";
import { Navbar } from "components";

interface AppState {
	pathname: string;
}
export default class App extends Component<{}, AppState> {
	state: AppState = {
		pathname: window.location.pathname,
	};

	getPage = () => {
		switch (this.state.pathname) {
			case "/login":
				return <Login />;
			case "/register":
				return <Register />;
			default:
				return <Home />;
		}
	};

	handleNavigate = (pathname: string) => {
		this.setState({ pathname });
	};

	render() {
		const { pathname } = this.state;
		return (
			<>
				<Navbar currentPathname={pathname} onNavigate={this.handleNavigate} />
				<div className="container">{this.getPage()}</div>
			</>
		);
	}
}
