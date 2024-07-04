

export type ReservationCreateDto = {
  email: string;
  reservationDate: string;
  showtimeId: string;
  seatIds: number[]
}

export const createReservation = async(reservationDto: ReservationCreateDto) => {
  return fetch("http://localhost:8080/api/reservations", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(reservationDto)
  }).then(response => {
    if (response.ok) return response.text()
    throw new Error("There was an error creating reservation!")
  }).then(result => console.log(result))
  .catch(err => console.log((err as Error).message))
}

