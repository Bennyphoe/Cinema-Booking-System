export type SeatReserveDto = {
  id: number;
  reserved: boolean;
  rowIdx: number;
  colIdx: number
}

export const fetchSeatsForShowtime = async(hallId: number, showtimeId: number): Promise<SeatReserveDto[]> => {
  return fetch(`http://localhost:8080/api/seats?hall=${hallId}&showtime=${showtimeId}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error("There was an error fetching seats for this showtime!")
  }).then(result => result)
  .catch(err => {
    console.log((err as Error).message)
  })
}