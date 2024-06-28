import { FC, useCallback, useEffect, useRef, useState } from "react";
import './styles.scss'
import MovieCard from "../../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { MovieDetail } from "./typings";
import { fetchShowingMovies } from "../ShowtimesPage/utils/fetchShowingMovies";

const setValidTranslation = (translation: number, width: number) => {
  if (translation >= 0) return 0
  if (translation < -width) return -width
  return translation
}

const MAX_TRANSLATION = 1000

const Home: FC = () => {
  const navigate = useNavigate()
  const [moviesShowing, setMoviesShowing] = useState<MovieDetail[]>([])
  const [startX, setStartX] = useState<number>(0)
  const [currentX, setCurrentX] = useState<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [translationOffset, setTranslationOffset] = useState<number>(0)
  const showingRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchShowing = async() => {
      const result = await fetchShowingMovies()
      setMoviesShowing(result)
    }
    fetchShowing()
  }, [])
  
  const handleMouseDownOnMovieCard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    setIsDragging(true)
    setStartX(event.clientX)
    setCurrentX(event.clientX)
  }

  const handleMouseMoveOnMovieCard =(event: MouseEvent) => {
    setCurrentX(event.clientX)
  }

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setTranslationOffset(prev => setValidTranslation(prev + (currentX - startX), MAX_TRANSLATION))
  }, [currentX, startX])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove',  handleMouseMoveOnMovieCard)
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove',  handleMouseMoveOnMovieCard)
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove',  handleMouseMoveOnMovieCard)
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging, handleMouseUp])

  

  
  const currentTranslation = isDragging ? currentX - startX : 0
  const translation = setValidTranslation(translationOffset + currentTranslation, MAX_TRANSLATION)

  return (
    <div className="container min-vh-100">
      <nav className="navbar navbar-expand-lg bg-transparent pt-4">
        <div className="container-fluid">
          <a className="navbar-brand brand" href="#">Baseus Cinema</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-danger px-4 py-2" onClick={() => navigate("/showtime")}>
                  <span>SHOWTIMES</span>
                  <i className="bi bi-calendar-week ms-2"></i>
                </button>
              </li>
            </ul>
            <a className="nav-link active login-btn" href="#" onClick={() => navigate("/login")}>
              Log In (Admin)
            </a>
          </div>
        </div>
      </nav>
      <div>
        <h3>Now Showing</h3>
        <hr/>
        <div className="container-fluid card-base">
          <div className="card-container" style={{
            transform: `translateX(${translation}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }} ref={showingRef}>
            {moviesShowing.map(movie => (
              <MovieCard movie={movie} mouseDown={handleMouseDownOnMovieCard} key={movie.name} onClickBuy={() => navigate(`/showtime/movie/${movie.id}`)}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home