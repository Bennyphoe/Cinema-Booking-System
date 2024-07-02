import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { Collapse } from "react-bootstrap";
import DatePicker from "react-datepicker";

type CreateMovieDto = {
  name: string;
  startDate: Dayjs;
  endDate: Dayjs;
  duration: string;
  rating: string;
  active: boolean;
  image: string | null;
}

const defaultMovieOptions: CreateMovieDto = {
  name: "",
    startDate: dayjs(),
    endDate: dayjs(),
    duration: "",
    rating: "",
    active: true,
    image: null
}

type CreateMovieProps = {
  toggleToaster: (message: string) => void
}


const CreateMovie: FC<CreateMovieProps> = ({toggleToaster}) => {
  const [collapse, setCollapse] = useState<boolean>(true)
  const token = sessionStorage.getItem("jwtToken")
  const [movieDetails, setMovieDetails] = useState<CreateMovieDto>(defaultMovieOptions)

  const reset = () => {
    setMovieDetails(defaultMovieOptions)
  }

  const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      const lastDotIdx = file.name.lastIndexOf(".")
      setMovieDetails(prev => ({...prev, image: file.name.substring(0, lastDotIdx)}))
    }
  }

  const createMovie = () => {
    fetch("http://localhost:8080/api/movies", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
      body: JSON.stringify(movieDetails)
    }).then(response => {
      if (response.ok) return response.text()
      throw new Error("There was an error creating the movie")
    }).then(() => {
      reset()
      toggleToaster(`Successfully created movie ${movieDetails.name}`)
    }).catch(err => console.log((err as Error).message))
  }

  const submitDetails = () => {
    createMovie()
  }

  return (
    <div className="container mt-4 w-80">
      <button className="btn btn-primary"  aria-controls="register-collapse" aria-expanded={false} onClick={() => setCollapse(!collapse)}>
        Create New Movie
      </button>
      <Collapse in={!collapse} className="mt-4">
        <div className="container">
          <div className="row mb-2">
            <label htmlFor="name" className="col-12 col-form-label">Movie Name:</label>
            <div className="col-6">
              <input type="text" className="form-control" value={movieDetails.name} onChange={(eve) => setMovieDetails(prev => ({...prev, name: eve.target.value}))}/>
            </div>
          </div>
          <div className="row mb-2">
            <label htmlFor="startdate" className="col-12 col-form-label">Start Date:</label>
            <div className="col-6">
              <DatePicker
                selected={movieDetails.startDate?.toDate()}
                onChange={(date) => setMovieDetails(prev => ({...prev, startDate: dayjs(date)}))}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                customInput={<input id="startdate" className="form-control"/>}
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="row mb-2">
            <label htmlFor="enddate" className="col-12 col-form-label">End Date:</label>
            <div className="col-6">
              <DatePicker
                selected={movieDetails.endDate?.toDate()}
                onChange={(date) => setMovieDetails(prev => ({...prev, endDate: dayjs(date)}))}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                customInput={<input id="enddate" className="form-control"/>}
                minDate={movieDetails.startDate?.toDate()}
              />
            </div>
          </div>
          <div className="row mb-2">
            <label htmlFor="duration" className="col-12 col-form-label">Duration(mins):</label>
            <div className="col-2">
              <input type="text" id="duration" className="form-control" value={movieDetails.duration} onChange={(eve) => setMovieDetails(prev => ({...prev, duration: eve.target.value}))}/>
            </div>
          </div>
          <div className="row mb-2">
            <label htmlFor="rating" className="col-12 col-form-label">rating:</label>
            <div className="col-1">
              <input type="text" id="rating" className="form-control" value={movieDetails.rating} onChange={(eve) => setMovieDetails(prev => ({...prev, rating: eve.target.value}))}/>
            </div>
          </div>
          <div className="row mb-2">
            <label htmlFor="rating" className="col-12 col-form-label">Upload Image:</label>
            <div className="col-3 mb-2">
              <input type="file" id="rating" className="form-control" onChange={eve => handleFileChange(eve)}/>
            </div>
          </div>
          <button className="btn btn-primary col-1" onClick={submitDetails}>submit</button>
        </div>
        
      </Collapse>
    </div>
  )
}

export default CreateMovie