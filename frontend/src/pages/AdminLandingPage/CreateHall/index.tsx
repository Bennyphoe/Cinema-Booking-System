import { FC, useState } from "react";
import { Collapse } from "react-bootstrap";
import { createHall } from "./utils";
type CreateHallProps = {
  toggleToaster: (msg: string, type?: string) => void
}

type HallDetail = {
  name: string;
  rowCount: string;
  colCount: string;
  active: boolean;
}

const defaultHallOptions: HallDetail = {
  name: "",
  rowCount: "0",
  colCount: "0",
  active: true
}

const CreateHall:FC<CreateHallProps> = ({toggleToaster}) => {
  const [collapse, setCollapse] = useState<boolean>(true)
  const token = sessionStorage.getItem("jwtToken")
  const [hallDetails, setHallDetails] = useState<HallDetail>(defaultHallOptions)

  const reset = () => {
    setHallDetails(defaultHallOptions)
  }

  const onSubmit = async() => {
    if (token) {
      const resultString = await createHall(token, hallDetails)
      if (!resultString.startsWith("Error")) {
        toggleToaster(resultString)
        reset()
      } else {
        toggleToaster(resultString, "danger")
      }
    }
    
  }
  return (
    <div className="container mt-4 w-80">
      <button className="btn btn-primary"  aria-controls="register-collapse" aria-expanded={false} onClick={() => setCollapse(!collapse)}>
        Create New Hall
      </button>
      <Collapse in={!collapse} className="mt-4">
        <div className="container">
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="name" className="form-label">name:</label>
              <input type="text" id="name" className="form-control" value={hallDetails.name} onChange={(eve) => setHallDetails(prev => ({...prev, name: eve.target.value}))}/>
            </div>
            <div className="col-3">
              <label htmlFor="rowcount" className="form-label">Rows:</label>
              <input type="text" id="rowcount" className="form-control" value={hallDetails.rowCount} onChange={(eve) => setHallDetails(prev => ({...prev, rowCount: (eve.target.value)}))}/>
            </div>
            <div className="col-3">
              <label htmlFor="colcount" className="form-label">Cols:</label>
              <input type="text" id="colcount" className="form-control" value={hallDetails.colCount} onChange={(eve) => setHallDetails(prev => ({...prev, colCount: (eve.target.value)}))}/>
            </div>
          </div>
          <button className="btn btn-primary col-1" onClick={onSubmit}>submit</button>
        </div>
        
      </Collapse>
    </div>
  )
}

export default CreateHall