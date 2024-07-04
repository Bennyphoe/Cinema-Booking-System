import dayjs, { Dayjs } from "dayjs";
import { FC, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { createShowtime, fetchActiveHallWithShowtimes, fetchActiveShowingMovies } from "./utils";
import DatePicker from "react-datepicker";
import './styles.scss'

type CreateShowtimeProps = {
  toggleToaster: (msg: string, type?: string) => void
}

export type CreateShowtimeDetail = {
  time: Dayjs;
  movieId: number | undefined;
  hallId: number | undefined;
}

export type MovieDto = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  rating: string;
  image: string;
  active: boolean
}

type ShowtimeStartEnd = {
  startDate: string;
  endDate: string;
}

export type HallDto = {
  id: number;
  name: string;
  showtimes: ShowtimeStartEnd[]
}

const defaultShowtimeDetails: CreateShowtimeDetail = {
  time: dayjs(),
  movieId: 0,
  hallId: 0,
}

const CreateShowtime: FC<CreateShowtimeProps> = ({toggleToaster}) => {
  const [collapse, setCollapse] = useState<boolean>(true)
  const token = sessionStorage.getItem("jwtToken")
  const [showtimeDetails, setShowtimeDetails] = useState<CreateShowtimeDetail>(defaultShowtimeDetails)
  const [movies, setMovies] = useState<MovieDto[]>([])
  const [halls, setHalls] = useState<HallDto[]>([])
  const [clashDetected, setClashDetected] = useState<boolean>(false)

  useEffect(() => {
    if (token) {
      fetchActiveHallWithShowtimes(token, setHalls)
      fetchActiveShowingMovies(token, setMovies)
    }
  }, [token])

  const reset = () => {
    setShowtimeDetails(defaultShowtimeDetails)
    fetchActiveHallWithShowtimes(token!, setHalls)
  }

  const onSubmit = async() => {
    if (token) {
      const resultString = await createShowtime(token, showtimeDetails)
      if (!resultString.startsWith("Error")) {
        toggleToaster(resultString, "success")
        reset()
      } else {
        toggleToaster(resultString, "danger")
      }
    }
    
  }
  
  const currentSelectedHallShowtimes: ShowtimeStartEnd[] = halls.find(hall => hall.id === showtimeDetails.hallId)?.showtimes.filter(st => dayjs(st.endDate).isAfter(dayjs())) ?? []
  const currentSelectedMovie: MovieDto | undefined = movies.find(movie => movie.id === showtimeDetails.movieId)


  return (
    <div className="container mt-4 w-80">
      <button className="btn btn-primary"  aria-controls="register-collapse" aria-expanded={false} onClick={() => setCollapse(!collapse)}>
        Create New Showtime
      </button>
      <Collapse in={!collapse} className="mt-4">
        <div className="container">
          <div className="row mb-3">
            <div className="col-7 mb-2">
              <label htmlFor="movie" className="form-label">Movie:</label>
              <select className="form-select" onChange={(eve) => setShowtimeDetails(prev => {
               return {...prev, movieId: Number(eve.target.value)}
              })} value={showtimeDetails.movieId}>
                <option value={0}>Select a Movie</option>
                {movies.map(movie => {
                  return (
                    <option key={movie.id} value={movie.id} >{`Id: ${movie.id} | Name: ${movie.name}`}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-7 mb-3">
              <label htmlFor="hall" className="form-label">Hall:</label>
              <select className="form-select" onChange={(eve) => setShowtimeDetails(prev => ({...prev, hallId: Number(eve.target.value) }))} value={showtimeDetails.hallId}>
                <option value={0}>Select a Hall</option>
                {halls.map(hall => {
                  return (
                    <option key={hall.id} value={hall.id}>{`Id: ${hall.id} | Name: ${hall.name}`}</option>
                  )
                })}
              </select>
              {currentSelectedHallShowtimes.length > 0 && <div className="d-flex flex-column g-1 other-showtimes-container">
                Other Showtimes:
                {currentSelectedHallShowtimes.map(st => {
                  return (
                    <span key={st.startDate}>{dayjs(st.startDate).format('DD/MM/YYYY HH:mm:ss')} to {dayjs(st.endDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                  )
                })}
              </div>}
            </div>
            <div className="col-6">
              <label htmlFor="time" className="form-label me-2">Time:</label>
              <DatePicker
                selected={showtimeDetails.time?.toDate()}
                onChange={(date) => {
                  //need to check if there's any clashes
                  console.log(dayjs(date).format('YYYY-MM-DDTHH:mm:ss'))
                  if (currentSelectedMovie) {
                    const selectedDateStart = dayjs(date)
                    const selectedDateEnd = dayjs(date).add(currentSelectedMovie.duration, 'minute')
                    const hasClash = currentSelectedHallShowtimes.some(st => selectedDateStart.isBefore(dayjs(st.endDate)) && selectedDateEnd.isAfter(dayjs(st.startDate)))
                    setClashDetected(hasClash)
                  }
                  setShowtimeDetails(prev => ({...prev, time: dayjs(date)}))
                }}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                customInput={<input id="time" className="form-control"/>}
                minDate={dayjs().toDate()}
              />
              {clashDetected && <span className="ms-2 text-warning">Clash Detected!</span>}
            </div>
          </div>
          <button className="btn btn-primary col-1" disabled={clashDetected} onClick={onSubmit}>submit</button>
        </div>
        
      </Collapse>
    </div>
  )
}

export default CreateShowtime