import { ShowtimeDto } from "."

export const fetchShowtimes = (token: string, setShowtimes: React.Dispatch<React.SetStateAction<ShowtimeDto[]>>) => {
  return fetch("http://localhost:8080/api/showtimes/all", {
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
  }).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
      return response.json().then(errorData => {
        throw new Error((errorData as Error).message || "There was an error fetching the showtimes")
      })
    }
  }).then(result => {
    setShowtimes(result)
  }).catch(err => console.log((err as Error).message))
}

export const deleteShowtime = (token: string, id: number) => {
  return fetch(`http://localhost:8080/api/showtimes/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
  }).then(response => {
    if (response.ok) {
      return response.text()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
      return response.json().then(errorData => {
        throw new Error((errorData as Error).message || "There was an error fetching the showtimes")
      })
    }
  }).then(result => {
    return result
  }).catch(err => `Error: ${(err as Error).message}`)
}