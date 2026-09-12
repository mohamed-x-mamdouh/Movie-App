import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from './Spinner'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        // التغيير الأول: إضافة append_to_response=videos للرابط
        const response = await fetch(
          `${API_BASE_URL}/movie/${id}?append_to_response=videos&language=en-US`,
          API_OPTIONS
        )

        if (!response.ok) {
          throw new Error('Failed to fetch movie details')
        }

        const data = await response.json()
        setMovie(data)
      } catch (error) {
        console.error(`Error fetching movie: ${error}`)
        setErrorMessage('Error fetching movie details. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (errorMessage || !movie) {
    return (
      <div className="text-center py-20 text-white">
        <p className="text-red-500 mb-4">{errorMessage || 'Movie not found'}</p>
        <Link to="/" className="text-light-100 underline hover:text-white">
          ← Back to Home
        </Link>
      </div>
    )
  }

  // التغيير الثاني: البحث عن التريلر الرسمي من يوتيوب
  const trailer = movie.videos?.results?.find(
    (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
  )

  return (
    <div>
      <div className="wrapper py-10">
        {/* زر العودة للصفحة الرئيسية */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white bg-dark-100/60 hover:bg-dark-100 px-4 py-2 rounded-lg mb-8 transition"
        >
          <span>←</span> Back to Movies
        </Link>

        <div className="flex flex-col md:flex-row gap-8 bg-dark-100/40 p-6 md:p-10 rounded-2xl backdrop-blur-md border border-light-100/10">
          {/* بوستر الفيلم */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : '/no-movie.png'
              }
              alt={movie.title}
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>

          {/* تفاصيل ومعلومات الفيلم */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-gray-400 italic mb-4 text-lg">"{movie.tagline}"</p>
              )}

              {/* التصنيفات (Genres) */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-primary/20 text-light-100 border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* النبذة عن الفيلم */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-base">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>
            </div>

            {/* إحصائيات سريعة (التقييم، المدة، تاريخ الإصدار، اللغة) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-light-100/10 text-white">
              <div>
                <p className="text-gray-400 text-xs">Rating</p>
                <p className="font-bold text-lg text-yellow-400">
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  <span className="text-xs text-gray-400 font-normal"> / 10</span>
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Runtime</p>
                <p className="font-semibold text-lg">
                  {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Release Date</p>
                <p className="font-semibold text-lg">
                  {movie.release_date || 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Language</p>
                <p className="font-semibold text-lg uppercase">
                  {movie.original_language || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* التغيير الثالث: عرض التريلر لو موجود */}
        {trailer && (
          <div className="mt-10 bg-dark-100/40 p-6 md:p-10 rounded-2xl backdrop-blur-md border border-light-100/10">
            <h2 className="text-2xl font-bold text-white mb-6">Official Trailer</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default MovieDetails