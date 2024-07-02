import { FC, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import Table from "../../../components/Table";
import Column from "../../../components/Column";
import { deleteHall, fetchAllHalls, updateHall } from "./utils";
import ViewHallsModal from "./ViewHallsModal";

type ViewHallsProps = {
  toggleToaster: (msg: string, type?: string) => void
}

export type ViewHallDto = {
  id: number;
  name: string;
  rowCount: number;
  colCount: number;
  active: boolean
}

const ViewHalls: FC<ViewHallsProps> = ({toggleToaster}) => {
  const [collapse, setCollapse] = useState<boolean>(true)
  const token = sessionStorage.getItem("jwtToken")
  const [halls, setHalls] = useState<ViewHallDto[]>([])
  const [editHallData, setEditHallData] = useState<ViewHallDto>()

  const editData = (id: number) => {
    const hallDataToEdit = halls.filter(hall => hall.id === id)
    setEditHallData(hallDataToEdit[0])
  }

  const deleteData = async(id: number) => {
    const userConfirmed = window.confirm("Are you sure you want to delete Hall with id: " + id + "?")
    if (userConfirmed && token) {
      const resultString = await deleteHall(token, id)
      if (!resultString.startsWith("Error")) {
        toggleToaster("Successfully deleted Movie with id: " + id, "success")
        fetchAllHalls(token, setHalls)
      } else {
        toggleToaster(resultString, "danger")
      }
    }
  }

  const onUpdate = async() => {
    if (token && editHallData) {
      const resultString = await updateHall(token, editHallData)
      if (!resultString.startsWith("Error")) {
        toggleToaster("Successfully updated Movie with id: " + editHallData.id, "success")
        fetchAllHalls(token, setHalls)
      } else {
        toggleToaster(resultString, "danger")
      }
      
    } 
  }
  
  useEffect(() => {
    if (token) {
      fetchAllHalls(token, setHalls)
    }
  }, [token])

  return (
    <div className="container mt-4 w-80">
      <button className="btn btn-primary d-inline"  aria-controls="register-collapse" aria-expanded={false} onClick={() => setCollapse(!collapse)}>
        View All Halls
      </button>
      
      <button className="btn btn-link btn-lg">
        <i className="bi bi-arrow-clockwise" style={{color: "white"}} onClick={() => fetchAllHalls(token!, setHalls)}></i>
      </button>
        
      
      <Collapse in={!collapse} className="mt-4">
        <div className="container">
        {editHallData && <ViewHallsModal data={editHallData} showModal={editHallData !== undefined} updateData={(newData: ViewHallDto | undefined) => setEditHallData(newData)} onUpdate={onUpdate}/>}
          <Table<ViewHallDto> dataSource={halls}>
            <Column<ViewHallDto> name="id">
            {datum => datum.id}
            </Column>
            <Column<ViewHallDto> name="name">
              {datum => datum.name}
            </Column>
            <Column<ViewHallDto> name="rowCount">
              {datum => datum.rowCount}
            </Column>
            <Column<ViewHallDto> name="colCount">
              {datum => datum.colCount}
            </Column>
            <Column<ViewHallDto> name="active">
              {datum => datum.active ? "true" : "false"}
            </Column>
            <Column<ViewHallDto> name="actions">
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

export default ViewHalls