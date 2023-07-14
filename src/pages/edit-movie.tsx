import { Input, Loader } from "components";
import Select from "components/select";
import { config } from "config";
import { ChangeEventHandler, Component, FormEventHandler, HTMLInputTypeAttribute } from "react";
import { toast } from "react-hot-toast";
import { Genre, Movie } from "services";
import { IEntity } from "types";

interface EditMovieState {
  title: string;
  genreId: string;
  stock: string;
  rate: string;
  genres: IEntity.Genre[];
  isLoading: boolean;
  isCreating: boolean;
}

interface EditMovieProps {
  movieId: string;
  onNavigate: (pathname: string) => void;
}

export default class EditMovie extends Component<EditMovieProps, EditMovieState> {
  state: EditMovieState = {
    title: "",
    genreId: "",
    stock: "",
    rate: "",
    genres: [],
    isLoading: true,
    isCreating: false,
  };

  handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    this.setState({ isCreating: true });

    const { title, genreId, rate, stock } = this.state;
    try {
      const accessToken = localStorage.getItem(config.tokenKEY)!;
      await Movie.Edit({
        title,
        genreId,
        dailyRentalRate: +rate,
        numberInStock: +stock,
        accessToken,
        movieId: this.props.movieId,
      });
      this.props.onNavigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data);
    } finally {
      this.setState({ isCreating: false });
    }
  };

  handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    this.setState({ [e.target.name]: e.target.value } as unknown as EditMovieState);
  };

  renderInput = (name: keyof EditMovieState, label: string, type?: HTMLInputTypeAttribute) => (
    <Input name={name} label={label} type={type} value={this.state[name] as string} onChange={this.handleChange} />
  );

  renderSelect = (name: keyof EditMovieState, label: string, options: IEntity.Genre[]) => (
    <Select name={name} label={label} value={this.state[name] as string} onChange={this.handleChange} options={options} />
  );

  async componentDidMount() {
    const { data: genres } = await Genre.List();
    const { data: movie } = await Movie.Single({ movieID: this.props.movieId });
    console.log("edit movie", movie);
    console.log("edit movie username", movie.username);

    this.setState({ genres, isLoading: false, title: movie.title, genreId: movie.genre._id, stock: `${movie.numberInStock}`, rate: `${movie.dailyRentalRate}` });
  }

  render() {
    const { isLoading, genres, isCreating } = this.state;
    if (isLoading) return <Loader />;

    return (
      <>
        <h1>Edit Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Select Movie Genre", genres)}
          {this.renderInput("stock", "Number in Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          <button className="btn btn-primary" disabled={isCreating}>
            Save
          </button>
        </form>
      </>
    );
  }
}