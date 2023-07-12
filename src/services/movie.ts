import { IApi } from "types";
import { http } from "./http";

export const List = (params?: IApi.Movie.List.Request) =>
	http.get<IApi.Movie.List.Response>("/movies");

export const Single = ({ movieID }: IApi.Movie.Single.Request) =>
	http.get<IApi.Movie.Single.Response>(`/movies/${movieID}`);
