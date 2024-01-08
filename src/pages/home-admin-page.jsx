import { ContentRowMovies } from "../components/ContentRowMovies"
import { GenresInDb } from "../components/GenresInDb"
import { LastMovieInDb } from "../components/LastMovieInDb"

export const HomeAdminPage = () => {
	return (
		<div className="container-fluid">
			
			<div className="row">
				<ContentRowMovies />

				<LastMovieInDb />
				<GenresInDb />
			</div>
		</div>

	)
}
