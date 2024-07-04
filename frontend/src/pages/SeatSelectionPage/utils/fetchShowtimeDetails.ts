import { MovieDetail } from "../../Home/typings";

type HallInfo = {
  id: number;
  name: string;
  rowCount: number;
  colCount: number;
}


export type ShowtimeMovieHallDto = {
  id: number;
  time: string;
  movieInfo: MovieDetail;
  hallInfo: HallInfo;
}

export const fetchShowtimeDetails = async(showtimeId: string): Promise<ShowtimeMovieHallDto> => {
  return fetch(`http://localhost:8080/api/showtimes/${showtimeId}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error("There was an Error fetching showtime details!")
  }).then(result => {
    return result
  }).catch(err => {
    console.log((err as Error).message)
  })
}