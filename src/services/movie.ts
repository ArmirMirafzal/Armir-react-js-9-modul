import { IApi } from "types";
import { http } from "./http";

export const List = (params?: IApi.Movie.List.Request) => http<IApi.Movie.List.Response>("/movies");

export const Single = ({ movieID }: IApi.Movie.Single.Request) =>
	http<IApi.Movie.Single.Response>(`/movies/${movieID}`);
