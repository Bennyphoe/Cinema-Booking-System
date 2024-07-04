type MovieInfo = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  rating: string;
  image: string;
  duration: number;
}

type ShowtimeInfo = {
  id: number;
  time: string;
}

export type ShowtimeMovieDto = {
  movie: MovieInfo
  showtimes: ShowtimeInfo[]
}

export const fetchMovieAndShowTimes = async (date: string): Promise<ShowtimeMovieDto[]> => {
  return fetch(`http://localhost:8080/api/showtimes?date=${date}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) return response.json()
    throw new Error("There was an error fetching movies and showtimes!")
  }).then(result => {
    return result as ShowtimeMovieDto[]
  }).catch(() => {
    return []
  })
}