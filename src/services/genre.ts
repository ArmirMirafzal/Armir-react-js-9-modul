import { IApi } from "types";
import { http } from "./http";

export const List = (params?: IApi.Genre.List.Request) =>
	http.get<IApi.Genre.List.Response>("/genres");

export const Single = ({ genreID }: IApi.Genre.Single.Request) =>
	http.get<IApi.Genre.Single.Response>(`/genres/${genreID}`);
