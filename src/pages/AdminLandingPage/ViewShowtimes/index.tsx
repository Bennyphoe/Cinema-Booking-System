import { FC, useEffect, useState } from "react";
import Column from "../../../components/Column";
import dayjs from "dayjs";
import Table from "../../../components/Table";
import { Collapse } from "react-bootstrap";
import { deleteShowtime, fetchShowtimes } from "./util";


export type ShowtimeDto = {
  id: number;
  startTime: string;
  endTime: string;
  hallId: number;
  movieId: number
}

type ViewShowtimesProps = {
  toggleToaster: (msg: string, type?: string) => void
}

const ViewShowtimes: FC<ViewShowtimesProps> = ({toggleToaster}) => {
  const [collapse, setCollapse] = useState<boolean>(true)
  const token = sessionStorage.getItem("jwtToken")
  const [showtimes, setShowtimes] = useState<ShowtimeDto[]>([])

  useEffect(() => {
    if (token) {
      fetchShowtimes(token, setShowtimes)
    }
  }, [token])

  const handleDelete = async(id: number) => {
    if (token) {
      const resultString = await deleteShowtime(token, id)
      if (!resultString.startsWith("Error")) {
        toggleToaster(resultString, "success")
        fetchShowtimes(token, setShowtimes)
      } else {
        toggleToaster(resultString, "danger")
      }
    }
    
  }

  return (
    <div className="container mt-4 w-80">
      <button className="btn btn-primary d-inline"  aria-controls="register-collapse" aria-expanded={false} onClick={() => setCollapse(!collapse)}>
        View All Showtimes
      </button>
      
      <button className="btn btn-link btn-lg" onClick={() => fetchShowtimes(token!, setShowtimes)}>
        <i className="bi bi-arrow-clockwise" style={{color: "white"}}></i>
      </button>
        
      
      <Collapse in={!collapse} className="mt-4">
        <div className="container">
          <Table<ShowtimeDto> dataSource={showtimes}>
            <Column<ShowtimeDto> name="id">
            {datum => datum.id}
            </Column>
            <Column<ShowtimeDto> name="Movie Id">
              {datum => datum.movieId}
            </Column>
            <Column<ShowtimeDto> name="Hall Id">
              {datum => datum.hallId}
            </Column>
            <Column<ShowtimeDto> name="Start Time">
              {datum => dayjs(datum.startTime).format("DD-MM-YYYY HH:mm:ss")}
            </Column>
            <Column<ShowtimeDto> name="End Time">
              {datum => dayjs(datum.endTime).format("DD-MM-YYYY HH:mm:ss")}
            </Column>
            <Column<ShowtimeDto> name="actions">
              {(datum) => {
                return (
                  <>
                    <a className ="nav-link active d-inline" href="#" onClick={() => handleDelete(datum.id)}>
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

export default ViewShowtimes