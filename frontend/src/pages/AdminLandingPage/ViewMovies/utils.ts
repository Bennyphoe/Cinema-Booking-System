import { MovieDetail } from "./ViewMovies"

export const updateMovie = (token: string, movie: MovieDetail): Promise<string> => {
  return fetch("http://localhost:8080/api/movies", {
    method: "PUT",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    body: JSON.stringify(movie)
  }).then(response => {
    if (response.ok) {
      return response.text()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
      return response.json().then(errorData => {
        throw new Error((errorData as Error).message || "There was an error updating the Movie with id: " + movie.id)
      })
    }
  }).then(result => result)
  .catch(err => `Error: ${(err as Error).message}`)
}

export const deleteMovie = (token: string, id: number): Promise<string> => {
  return fetch(`http://localhost:8080/api/movies/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
  }).then(response => {
    if (response.ok) {
      return response.text()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
      return response.json().then(errorData => {
        throw new Error((errorData as Error).message || "There was an error deleting the Movie with id: " + id)
      })
    }
  }).then(result => result)
  .catch(err => `Error: ${(err as Error).message}`)
}

export const fetchAllMovies = (token: string, setMovies: React.Dispatch<React.SetStateAction<MovieDetail[]>>) => {
  return fetch("http://localhost:8080/api/movies", {
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
  }).then(response => {
    if (response.ok) return response.json()
    throw new Error("There was an error fetching movies!")
  }).then(result => {
    setMovies(result)
  }).catch(err => {
    console.log((err as Error).message)
  })
}