import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<>
		<App />
		<Toaster />
	</>
);
