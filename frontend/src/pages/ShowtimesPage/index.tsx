import { FC, useEffect, useState } from "react";
import './styles.css'
import { useDateSelectorHook } from "../../hooks/DateSelectorHook";
import { ShowtimeMovieDto, fetchMovieAndShowTimes } from "./utils/fetchMovieAndShowTimes";
import { formatMinutes } from "../../utils/formatTime";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { getBreadCrumbs } from "./utils/breadcrumbs";
import { MovieDetail } from "../Home/typings";
import { fetchShowingMovies } from "./utils/fetchShowingMovies";

type FetchQueryOptions = {
  movieId: number | undefined;
  dateSelected: string;
}

type MovieOption = {
  value: number
  text: string;
}

const filterMovies = (movieShowtimes: ShowtimeMovieDto[], selectedId: number | undefined) => {
  if (selectedId === undefined) return []
  if (selectedId === 0) {
    return movieShowtimes.filter(movieShowtime => movieShowtime.showtimes.length > 0)
  } else {
    return movieShowtimes.filter(movieShowtime => {
      return movieShowtime.movie.id === selectedId
    })
  }
}

const ShowtimePage: FC = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const {dateOptions} = useDateSelectorHook()
  const [moviesShowing, setMoviesShowing] = useState<MovieDetail[]>([])
  const [moviesShowtimes, setMoviesShowtimes] = useState<ShowtimeMovieDto[]>([])
  const [fetchQueryOptions, setFetchQueryOptions] = useState<FetchQueryOptions>({
    movieId: undefined,
    dateSelected: ''
  })
  const [appliedFetchQueryOptions, setAppliedFetchQueryOptions] = useState<FetchQueryOptions>({
    movieId: undefined,
    dateSelected: ''
  })
  let movieOptions: MovieOption[] = moviesShowing.map(movie => ({value: movie.id, text: movie.name}))
  movieOptions = [{value: 0, text: "All Movies"}, ...movieOptions]

  useEffect(() => {
    const fetchShowing = async() => {
      const result = await fetchShowingMovies()
      setMoviesShowing(result)
    }
    fetchShowing()
  }, [])
  
  useEffect(() => {
    if (dateOptions.length > 0) {
      setFetchQueryOptions({
        movieId: movieId ? Number(movieId) : 0,
        dateSelected: dateOptions[0].value
      })
      setAppliedFetchQueryOptions({
        movieId: movieId ? Number(movieId) : 0,
        dateSelected: dateOptions[0].value
      })
    }
  }, [dateOptions, movieId])

  const fetchMoviesAndShowtimes = () => {
    setAppliedFetchQueryOptions(fetchQueryOptions)
  }

  useEffect(() => {
    (async () => {
      if (appliedFetchQueryOptions.dateSelected) {
        const moviesAndShowtimes: ShowtimeMovieDto[] = await fetchMovieAndShowTimes(appliedFetchQueryOptions.dateSelected)
        setMoviesShowtimes(moviesAndShowtimes)
      }
    })()
  }, [appliedFetchQueryOptions])

  const filteredList = filterMovies(moviesShowtimes, appliedFetchQueryOptions.movieId)
  console.log(filteredList)
  return (
    <div className="container-fluid min-vh-100">
      <h2 className="pt-3 showtime-title">Movies & Showtimes</h2>
      <BreadCrumb breadCrumbs={getBreadCrumbs}/>
      <div className="field-selection-section">
        <select name="dates" id="dates" className="select-container" value={fetchQueryOptions.dateSelected ?? dateOptions[0].value} onChange={(eve) => {
          setFetchQueryOptions(prev => {
            return {
              ...prev,
              dateSelected: eve.target.value
            }
          })
        }}>
          {dateOptions.map(dateOption => {
            return (
              <option key={dateOption.value} value={dateOption.value}>{dateOption.text}</option>
            )
          })}
        </select>
        <select name="movies" id="movies" className="select-container" value={fetchQueryOptions.movieId ?? movieOptions[0].value} onChange={(eve) => {
          setFetchQueryOptions(prev => {
            return {
              ...prev,
              movieId: Number(eve.target.value)
            }
          })
        }}>
          {movieOptions.map(movie => {
            return (
              <option key={movie.value} value={movie.value}>{movie.text}</option>
            )
          })}
        </select>
        <button className="btn btn-danger px-4 py-2" onClick={fetchMoviesAndShowtimes}>
          <span>SHOWTIMES</span>
          <i className="bi bi-calendar-week ms-2"></i>
        </button>
      </div>
      <hr/>
      {filteredList.length === 0 && <h5>Sorry! There are no Showtimes currently for selected date! Check other dates. Thanks!</h5>}
      <div className="container-fluid">
          {filteredList.map(movieShowtime => {
            return (
              <div key={movieShowtime.movie.id} className="row showtime-movie-row mb-3 mx-2">
                <div className="col-2 image-container">
                  <img src={`/${movieShowtime.movie.image}.jpg`} className="img" alt="image"/>
                </div>
                <div className="col-3">
                  <div>{movieShowtime.movie.name}</div>
                  <div>{movieShowtime.movie.rating} | {formatMinutes(movieShowtime.movie.duration)}</div>
                </div>
                <div className="col-7 showtimes-container d-flex gap-1">
                  {movieShowtime.showtimes.length > 0 && movieShowtime.showtimes.map(showtime => {
                    return (
                      <button key={showtime.id} type="button" className="btn btn-light showtime" onClick={() => navigate(`/seatSelection/${showtime.id}`)}>{dayjs(showtime.time).format("hh:mm A")}</button>
                    )
                  })}
                  {movieShowtime.showtimes.length === 0 && <div>No Showtimes currently. Check other dates!</div>}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ShowtimePage