import { ViewHallDto } from "."

export const updateHall = (token: string, hall: ViewHallDto): Promise<string> => {
  return fetch("http://localhost:8080/api/halls", {
    method: "PUT",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    body: JSON.stringify(hall)
  }).then(response => {
    if (response.ok) {
      return response.text()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
      return response.json().then(errorData => {
        throw new Error((errorData as Error).message || "There was an error updating the hall with id: " + hall.id)
      })
    }
  }).then(result => result)
  .catch(err => `Error: ${(err as Error).message}`)
}

export const deleteHall = (token: string, id: number): Promise<string> => {
  return fetch(`http://localhost:8080/api/halls/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
  }).then(response => {
    if (response.ok) {
      return response.text()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
      return response.json().then(errorData => {
        throw new Error((errorData as Error).message || "There was an error deleting the Hall with id: " + id)
      })
    }
  }).then(result => result)
  .catch(err => `Error: ${(err as Error).message}`)
}

export const fetchAllHalls = (token: string, setHalls: React.Dispatch<React.SetStateAction<ViewHallDto[]>>) => {
  return fetch("http://localhost:8080/api/halls", {
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
  }).then(response => {
    if (response.ok) return response.json()
    throw new Error("There was an error fetching halls!")
  }).then(result => {
    setHalls(result)
  }).catch(err => {
    console.log((err as Error).message)
  })
}