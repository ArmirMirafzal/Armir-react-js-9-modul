import { Component } from "react";
import { Home, Login, NewMovie, Register } from "pages";
import { Loader, Navbar } from "components";
import { IEntity } from "types";
import { config } from "config";
import { Auth } from "services";
import { toast } from "react-hot-toast";
import { delay } from "utils";

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

	handleLogout = () => {
		localStorage.removeItem(config.tokenKEY);
		this.setState({ user: null });
	};

	handleNavigate = (pathname: string) => {
		window.history.pushState({}, "", pathname);
		this.setState({ pathname });
	};

	getPage = () => {
		const { user, pathname } = this.state;
		switch (pathname) {
			case "/login":
				if (user) {
					this.handleNavigate("/");
					return null;
				}
				return <Login onLogin={this.handleLogin} />;

			case "/register":
				if (user) {
					this.handleNavigate("/");
					return null;
				}
				return <Register onNavigate={this.handleNavigate} />;

			case "/new-movie":
				if (!user) {
					this.handleNavigate("/");
					return null;
				}
				return <NewMovie onNavigate={this.handleNavigate} />;

			case "/":
				return <Home onNavigate={this.handleNavigate} user={user} />;

			default:
				this.handleNavigate("/");
				return null;
		}
	};

	async componentDidMount() {
		const accessToken = localStorage.getItem(config.tokenKEY)!;
		try {
			await delay();
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
					onLogout={this.handleLogout}
					user={user}
					currentPathname={pathname}
					onNavigate={this.handleNavigate}
				/>
				<div className="container">{this.getPage()}</div>
			</>
		);
	}
}
