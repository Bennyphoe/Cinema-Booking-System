import { CreateShowtimeDetail, HallDto, MovieDto } from "."


export const fetchActiveHallWithShowtimes = (token: string, setHalls: React.Dispatch<React.SetStateAction<HallDto[]>>) => {
  return fetch("http://localhost:8080/api/halls/active", {
    method: "GET",
    headers: {"Content-Type": 'application/json', "Authorization": `Bearer ${token}`}
  }).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
        return response.json().then(errorData => {
          throw new Error((errorData as Error).message || "There was an error fetching active halls!")
        })
      }
  }).then(result => {
    setHalls(result ?? [])
  })
  .catch(err => (err as Error).message)
}

export const fetchActiveShowingMovies = (token: string, setMovies: React.Dispatch<React.SetStateAction<MovieDto[]>>) => {
  return fetch("http://localhost:8080/api/movies/showing", {
    method: "GET",
    headers: {"Content-Type": 'application/json', "Authorization": `Bearer ${token}`}
  }).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
        return response.json().then(errorData => {
          throw new Error((errorData as Error).message || "There was an error fetching active movies!")
        })
      }
  }).then(result => {
    setMovies(result ?? [])
  })
  .catch(err => (err as Error).message)
}

export const createShowtime = (token: string, newShowtime: CreateShowtimeDetail): Promise<string> => {
  return fetch("http://localhost:8080/api/showtimes", {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    body: JSON.stringify({
      ...newShowtime,
      time: newShowtime.time.format('YYYY-MM-DDTHH:mm:ss')
    })
  }).then(response => {
    if (response.ok) {
      return response.text()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
      //return a promise that resolved to the parsed JSON body of the response
      return response.json().then(errorData => {
        throw new Error((errorData as Error).message || "There was an error creating the Showtime")
      })
    }
  }).then(result => result)
  .catch(err => `Error: ${(err as Error).message}`)
}