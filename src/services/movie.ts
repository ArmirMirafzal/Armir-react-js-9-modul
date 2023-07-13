import { IApi } from "types";
import { http } from "./http";
import { config } from "config";

export const List = (params?: IApi.Movie.List.Request) =>
	http.get<IApi.Movie.List.Response>("/movies");

export const Single = ({ movieID }: IApi.Movie.Single.Request) =>
	http.get<IApi.Movie.Single.Response>(`/movies/${movieID}`);

export const Create = ({ accessToken, ...body }: IApi.Movie.Create.Request) =>
	http.post<IApi.Movie.Create.Response>(`/movies`, body, {
		headers: { [config.tokenKEY]: accessToken },
	});
