import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShowtimeMovieHallDto, fetchShowtimeDetails } from "./utils/fetchShowtimeDetails";
import dayjs from "dayjs";
import './styles.css'
import { SeatReserveDto, fetchSeatsForShowtime } from "./utils/fetchSeatsForShowtime";
import { ReservationCreateDto, createReservation } from "./utils/createReservation";
import { useToastHook } from "../../hooks/ToastHook";
import BreadCrumb from "../../components/BreadCrumb";
import { getBreadCrumbs } from "./utils/breadcrumbs";

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
  const [userEmail, setUserEmail] = useState<string>("")
  const { createToaster, toggleToaster } = useToastHook()
  const ToasterComponent = createToaster()

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

  const reset = () => {
    setSelectedSeats([])
    setUserEmail("")
  }

  const createNewReservation = async() => {
    const newReservation: ReservationCreateDto = {
      email: userEmail,
      reservationDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      showtimeId: showtimeId!,
      seatIds: selectedSeats!.map(seat => seat.id)
    }
    await createReservation(newReservation)
    toggleToaster("Reservation was successful!")

    //Refetch Seats
    const seats = await fetchSeatsForShowtime(showtimeDetails!.hallInfo.id, showtimeDetails!.id)
    setShowtimeSeats(seats)

    reset()

  }

  const formattedShowTimeSeats = showtimeSeats ? formatShowtimeSeats(showtimeSeats) : []

  const selectedSeatsString = selectedSeats?.map(seat => `${seat.rowIdx}-${seat.colIdx}`).join(", ")

  

  return (
    <div className="container-fluid min-vh-100 p-5">
      <BreadCrumb breadCrumbs={getBreadCrumbs}/>
      {ToasterComponent}
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
                  <div key={row[0].rowIdx} className="seat-row">
                    {row.map(seat => {
                      return (
                        <button key={seat.id} onClick={() => selectSeat(seat)} disabled={seat.reserved}>
                          <div className={`${selectedSeats?.includes(seat) ? 'seat-selected' : ''} seat ${seat.reserved ? 'seat-reserved': ''}`}>
                            <div className="seat-top"></div>
                          </div>
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
      <div className="container-fluid selected-seats-container">
            <div className="row">
              <div className="col-auto">Seats:</div>
              <div className="col-8">{selectedSeatsString}</div>
            </div>
            <br></br>
            <div className="row">
              <label htmlFor="email" className="col-auto col-form-label">Email: </label>
              <div className="col-8">
                <input type="email" value={userEmail} onChange={(eve) => setUserEmail(eve.target.value)} placeholder="name@example.com" className="form-control" style={{backgroundColor: "#302c2d", color: "#ffffff"}}/>
              </div>
              
            </div>
            
            
      </div>
      <div className="container-fluid selection-buttons-container">
        <button className="btn btn-danger ms-auto" disabled={!selectedSeats || selectedSeats?.length === 0} onClick={createNewReservation}>Confirm Seat(s)</button>
        <button className="btn btn-danger" onClick={reset} disabled={!selectedSeats || selectedSeats?.length === 0}>Reset</button>
      </div>
    </div>
  )
}

export default SeatSelectionPage