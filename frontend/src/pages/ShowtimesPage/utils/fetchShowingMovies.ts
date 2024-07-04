import { MovieDetail } from "../../Home/typings"

export const fetchShowingMovies = async(): Promise<MovieDetail[]> => {
  return fetch("http://localhost:8080/api/movies/showing")
  .then(response => {
    if (response.ok) return response.json()
    throw new Error("There was an error fetching movies currently showing!")
  }).then(result => {
    return result
  }).catch(err => console.log((err as Error).message))
}