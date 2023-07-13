import { Component } from "react";
import { Home, Login, Register } from "pages";
import { Loader, Navbar } from "components";
import { IEntity } from "types";
import { config } from "config";
import { Auth } from "services";
import { toast } from "react-hot-toast";

interface AppState {
	pathname: string;
	user: IEntity.User;
	isLoading: boolean;
}
export default class App extends Component<{}, AppState> {
	state: AppState = {
		pathname: window.location.pathname,
		user: null,
		isLoading: true,
	};

	handleLogin = (user: IEntity.User) => {
		this.setState({ user });
		this.handleNavigate("/");
	};

	handleNavigate = (pathname: string) => {
		window.history.pushState({}, "", pathname);
		this.setState({ pathname });
	};

	getPage = () => {
		switch (this.state.pathname) {
			case "/login":
				return <Login onLogin={this.handleLogin} />;
			case "/register":
				return <Register />;
			default:
				return <Home />;
		}
	};

	async componentDidMount() {
		const accessToken = localStorage.getItem(config.tokenKEY)!;
		try {
			if (accessToken) {
				const { data: user } = await Auth.GetMe({ accessToken });
				this.setState({ user, isLoading: false });
			}
		} catch (err: any) {
			localStorage.removeItem(config.tokenKEY);
			toast.error(err?.response?.data);
		} finally {
			this.setState({ isLoading: false });
		}
	}

	render() {
		const { pathname, user, isLoading } = this.state;

		if (isLoading) return <Loader />;

		return (
			<>
				<Navbar
					onLogout={() => this.setState({ user: null })}
					user={user}
					currentPathname={pathname}
					onNavigate={this.handleNavigate}
				/>
				<div className="container">{this.getPage()}</div>
			</>
		);
	}
}
