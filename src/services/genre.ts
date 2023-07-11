import { IApi } from "types";
import { http } from "./http";

export const List = (params?: IApi.Genre.List.Request) => http<IApi.Genre.List.Response>("/genres");

export const Single = ({ genreID }: IApi.Genre.Single.Request) =>
	http<IApi.Genre.Single.Response>(`/genres/${genreID}`);
