import { IEntity } from "types";

interface NavbarProps {
	onNavigate: (pathname: string) => void;
	currentPathname: string;
	user: IEntity.User;
	onLogout: () => void;
}

const paths = [
	{ pathname: "/login", title: "Login" },
	{ pathname: "/register", title: "Register" },
];

const Navbar = ({ onNavigate, currentPathname, user, onLogout }: NavbarProps) => (
	<nav className="navbar navbar-expand-sm bg-body-tertiary mb-3">
		<div className="container justify-content-start">
			<span className="navbar-brand" onClick={() => onNavigate("/")}>
				Movies App
			</span>
			{user ? (
				<ul className="navbar-nav d-flex">
					<li className="nav-item">
						<span className="nav-link">{user?.name}</span>
					</li>
					<li className="nav-item">
						<span className="nav-link" onClick={onLogout}>
							Log out
						</span>
					</li>
				</ul>
			) : (
				<ul className="navbar-nav d-flex">
					{paths.map((path) => (
						<li key={path.pathname} className="nav-item">
							<span
								className={`nav-link ${path.pathname === currentPathname ? "active" : ""}`}
								onClick={() => onNavigate(path.pathname)}
							>
								{path.title}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	</nav>
);

export default Navbar;
