import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowtimeMovieHallDto, fetchShowtimeDetails } from "./utils/fetchShowtimeDetails";
import dayjs from "dayjs";
import './styles.css'
import { SeatReserveDto, fetchSeatsForShowtime } from "./utils/fetchSeatsForShowtime";

const formatShowtimeSeats = (showtimeSeats: SeatReserveDto[]): SeatReserveDto[][] => {
  return showtimeSeats.reduce<SeatReserveDto[][]>((acc, seat) => {
    const rowIdx = seat.rowIdx
    const colIdx = seat.colIdx
    if (!acc[rowIdx]) {
      acc[rowIdx] = []
    }
    acc[rowIdx][colIdx] = seat
    return acc
  }, [])
}

const SeatSelectionPage: FC = () => {
  const { showtimeId } = useParams()
  const [showtimeDetails, SetShowtimeDetails] = useState<ShowtimeMovieHallDto>()
  const [showtimeSeats, setShowtimeSeats] = useState<SeatReserveDto[]>()
  const [selectedSeats, setSelectedSeats] = useState<SeatReserveDto[]>()

  useEffect(() => {
    const fetchShowTimeDetails = async() => {
      const result = await fetchShowtimeDetails(showtimeId!)
      SetShowtimeDetails(result)
      const seats = await fetchSeatsForShowtime(result.hallInfo.id, result.id)
      setShowtimeSeats(seats)
    }
    if (showtimeId) {
      fetchShowTimeDetails()
    }
  }, [showtimeId])

  const selectSeat = (seat: SeatReserveDto) => {
    let currSelected = []
    if (selectedSeats?.includes(seat)) {
      currSelected = selectedSeats.filter(selected => selected.id !== seat.id)
    } else {
      currSelected = [...(selectedSeats ?? []), seat]
    }
    setSelectedSeats(currSelected)
  }

  const formattedShowTimeSeats = showtimeSeats ? formatShowtimeSeats(showtimeSeats) : []



  return (
    <div className="container-fluid min-vh-100 p-5">
      <div className="movie-container p-3">
        <div className=" h-100 w-100 row">
          <div className="col-4 image-container">
            <img src={`/${showtimeDetails?.movieInfo.image}.jpg`} className="img" alt="image"/>
          </div>
          <div className="col-8 d-flex flex-column g-2">
            <h2>{showtimeDetails?.movieInfo.name}</h2>
            <h3>{showtimeDetails?.hallInfo.name}</h3>
            <h3>{dayjs(showtimeDetails?.time).format("ddd DD MMM YYYY")}</h3>
            <h3>{dayjs(showtimeDetails?.time).format("h mm A")}</h3>
          </div>
        </div>
      </div>
      <div className="container-fluid seats-container mt-3">
          <div className="seats-boundary">
            <div className="screen mb-3">SCREEN</div>
            <div className="seating-area">
              {formattedShowTimeSeats.map(row => {
                return (
                  <div className="seat-row">
                    {row.map(seat => {
                      return (
                        <button onClick={() => selectSeat(seat)} disabled={seat.reserved}>
                          <div className={`${selectedSeats?.includes(seat) ? 'seat-selected' : ''} seat ${seat.reserved ? 'seat-reserved': ''}`}></div>
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
      </div>
      <div className="container-fluid legend-container">
        Reserved
        <div className="seat seat-reserved mx-3"></div> | 
        Selected
        <div className="seat seat-reserved seat-selected mx-3"></div> |
        Available
        <div className="seat mx-3"></div>
      </div>
    </div>
  )
}

export default SeatSelectionPage