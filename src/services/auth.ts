import { IApi } from "types";
import { http } from "./http";

export const Login = ({ email, password }: IApi.Auth.Login.Request) =>
	http.post<IApi.Auth.Login.Response>("/auth", { email, password });

export const Register = ({ name, email, password }: IApi.Auth.Register.Request) =>
	http.post<IApi.Auth.Register.Response>("/users", { name, email, password });

export const GetMe = ({ accessToken }: IApi.Auth.GetMe.Request) =>
	http.get<IApi.Auth.GetMe.Response>("/users/me", {
		headers: {
			"x-auth-token": accessToken,
		},
	});
