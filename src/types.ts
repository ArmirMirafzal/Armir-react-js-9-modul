export namespace IEntity {
	export interface Genre {
		_id: string;
		name: string;
	}

	export interface Movie {
		_id: string;
		title: string;
		genre: Genre;
		numberInStock: number;
		dailyRentalRate: number;
		username: string;
	}

	export type User = {
		_id: string;
		name: string;
		email: string;
		isAdmin: boolean;
	} | null;
}

export namespace IApi {
	export namespace Genre {
		export namespace List {
			export interface Request extends Params {}
			export interface Params {}
			export type Response = IEntity.Genre[];
		}

		export namespace Single {
			export interface Request extends Params {}
			export interface Params {
				genreID: string;
			}
			export type Response = IEntity.Genre;
		}
	}

	export namespace Movie {
		export namespace List {
			export interface Request extends Params {}
			export interface Params {}
			export type Response = IEntity.Movie[];
		}

		export namespace Single {
			export interface Request extends Params {}
			export interface Params {
				movieID: string;
			}
			export type Response = IEntity.Movie;
		}
	}

	export namespace Auth {
		export namespace Login {
			export interface Request extends Params {}
			export interface Params {
				email: string;
				password: string;
			}
			export interface Response {
				data: string;
			}
		}

		export namespace Register {
			export interface Request extends Params {}
			export interface Params {
				name: string;
				email: string;
				password: string;
			}
			export interface Response {
				_id: string;
				name: string;
				email: string;
			}
		}

		export namespace GetMe {
			export interface Request extends Params {}
			export interface Params {
				accessToken: string;
			}
			export type Response = IEntity.User;
		}
	}
}
