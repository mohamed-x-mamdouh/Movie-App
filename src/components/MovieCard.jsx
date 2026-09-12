import {Link} from "react-router-dom";

function MovieCard({ movie: {title, vote_average, poster_path, release_date, original_language, id} }) {
    return (
        <Link to={`/movie/${id}`}>
            <div className="movie-card text-white">
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/no-poster.svg'} alt={title} />
                <div className="mt-4">
                    <h3>{title}</h3>

                    <div className="content">
                        <div className="rating">
                            <img src="/star.svg" alt="Star icon" />
                            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                        </div>

                        <span>•</span>
                        <p className="lang">{original_language}</p>
                        <span>•</span>
                        <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                    </div>

                    <button className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black">View Details</button>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard;