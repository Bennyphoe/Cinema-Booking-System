type HallDetail = {
  name: string;
  rowCount: string;
  colCount: string;
}

export const createHall = (token: string, newHall: HallDetail): Promise<string> => {
  return fetch("http://localhost:8080/api/halls", {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    body: JSON.stringify({
      ...newHall,
      rowCount: Number(newHall.rowCount),
      colCount: Number(newHall.colCount)
    })
  }).then(response => {
    if (response.ok) {
      return response.text()
    } else {
      if (response.status === 401) throw new Error(`Unauthorized access - please log in`)
      //return a promise that resolved to the parsed JSON body of the response
      return response.json().then(errorData => {
        throw new Error((errorData as Error).message || "There was an error creating the Hall with id: " + newHall.name)
      })
    }
  }).then(result => result)
  .catch(err => `Error: ${(err as Error).message}`)
}
