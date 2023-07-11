import { IApi } from "types";
import { http } from "./http";

export const RegisterApi = async (params?: IApi.Auth.Register.Request) =>
	http.post<IApi.Auth.Register.Response>("/users", params);

export const LoginApi = async (params?: IApi.Auth.Login.Request) =>
	http.post<IApi.Auth.Login.Response>(`/auth`, params);

export const GetMe = async () => {};
