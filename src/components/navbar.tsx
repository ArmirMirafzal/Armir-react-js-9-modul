interface NavbarProps {
	onNavigate: (pathname: string) => void;
	currentPathname: string;
}

const paths = [
	{ pathname: "/login", title: "Login" },
	{ pathname: "/register", title: "Register" },
];

const Navbar = ({ onNavigate, currentPathname }: NavbarProps) => {
	const handleNavigate = (pathname: string) => {
		window.history.pushState({}, "", pathname);
		onNavigate(pathname);
	};

	return (
		<nav className="navbar navbar-expand-sm bg-body-tertiary mb-3">
			<div className="container justify-content-start">
				<span className="navbar-brand" onClick={() => handleNavigate("/")}>
					Movies App
				</span>
				<ul className="navbar-nav d-flex">
					{paths.map((path) => (
						<li key={path.pathname} className="nav-item">
							<span
								className={`nav-link ${path.pathname === currentPathname ? "active" : ""}`}
								onClick={() => handleNavigate(path.pathname)}
							>
								{path.title}
							</span>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
