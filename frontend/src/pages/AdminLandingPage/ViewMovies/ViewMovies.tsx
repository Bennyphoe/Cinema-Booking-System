import { FC, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import Table from "../../../components/Table";
import Column from "../../../components/Column";
import dayjs from "dayjs";
import ViewMoviesModal from "./ViewMoviesModal";
import { deleteMovie, updateMovie } from "./utils";
import { fetchAllMovies } from "./utils";

type ViewMoviesProps = {
  toggleToaster: (msg: string, type?: string) => void
}


export type MovieDetail = {
  id: number;
  name: string,
  startDate: string,
  endDate: string,
  rating: string,
  duration: number,
  active: boolean,
  image: string | null
}


const ViewMovies: FC<ViewMoviesProps> = ({toggleToaster}) => {
  const [collapse, setCollapse] = useState<boolean>(true)
  const token = sessionStorage.getItem("jwtToken")
  const [movies, setMovies] = useState<MovieDetail[]>([])
  const [editMovieData, setEditMovieData] = useState<MovieDetail>()

  

  const editData = (id: number) => {
    const movieDataToEdit = movies.filter(movie => movie.id === id)
    setEditMovieData(movieDataToEdit[0])
  }

  const deleteData = async(id: number) => {
    const userConfirmed = window.confirm("Are you sure you want to delete movie with id: " + id + "?")
    if (userConfirmed && token) {
      const resultString = await deleteMovie(token, id)
      if (!resultString.startsWith("Error")) {
        toggleToaster("Successfully deleted Movie with id: " + id, "success")
        fetchAllMovies(token, setMovies)
      
      } else {
        toggleToaster(resultString, "danger")
      }
    }
  }

  const onUpdate = async() => {
    if (token && editMovieData) {
      const resultString = await updateMovie(token, editMovieData)
      if (!resultString.startsWith("Error")) {
        toggleToaster("Successfully updated Movie with id: " + editMovieData.id, "success")
        fetchAllMovies(token, setMovies)
      } else {
        toggleToaster(resultString, "danger")
      }
      
    } 
  }
  
  useEffect(() => {
    if (token) {
      fetchAllMovies(token, setMovies)
    }
    
  }, [token])
  return (
    <div className="container mt-4 w-80">
      <button className="btn btn-primary d-inline"  aria-controls="register-collapse" aria-expanded={false} onClick={() => setCollapse(!collapse)}>
        View All Movies
      </button>
      
      <button className="btn btn-link btn-lg">
        <i className="bi bi-arrow-clockwise" style={{color: "white"}} onClick={() => fetchAllMovies(token!, setMovies)}></i>
      </button>
        
      
      <Collapse in={!collapse} className="mt-4">
        <div className="container">
        {editMovieData && <ViewMoviesModal data={editMovieData} showModal={editMovieData !== undefined} updateData={(newData: MovieDetail | undefined) => setEditMovieData(newData)} onUpdate={onUpdate}/>}
          <Table<MovieDetail> dataSource={movies}>
            <Column<MovieDetail> name="id">
            {datum => datum.id}
            </Column>
            <Column<MovieDetail> name="name">
              {datum => datum.name}
            </Column>
            <Column<MovieDetail> name="start date">
              {datum => dayjs(datum.startDate).format("DD-MM-YYYY hh:mm:ss")}
            </Column>
            <Column<MovieDetail> name="end date">
              {datum => dayjs(datum.endDate).format("DD-MM-YYYY hh:mm:ss")}
            </Column>
            <Column<MovieDetail> name="rating">
              {datum => datum.rating}
            </Column>
            <Column<MovieDetail> name="duration">
              {datum => datum.duration}
            </Column>
            <Column<MovieDetail> name="active">
              {datum => datum.active ? 'true' : 'false'}
            </Column>
            <Column<MovieDetail> name="actions">
              {(datum) => {
                return (
                  <>
                    <a className ="nav-link active d-inline me-1" href="#" onClick={() => editData(datum.id)}>
                      <i className="bi bi-pencil-fill"></i>
                    </a>
                    <a className ="nav-link active d-inline" href="#" onClick={() => deleteData(datum.id)}>
                      <i className="ps-2 bi bi-trash3-fill"></i>
                    </a>
                  </>
                )
              }}
            </Column>
          </Table>
        </div>
      </Collapse>
    </div>
 )
}

export default ViewMovies