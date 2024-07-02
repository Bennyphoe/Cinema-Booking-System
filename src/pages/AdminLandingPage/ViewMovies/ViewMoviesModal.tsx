import { FC, useEffect, useState } from "react";
import { MovieDetail } from "./ViewMovies";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { Button, Modal } from "react-bootstrap";

type ViewMoviesModalProps = {
  showModal: boolean;
  data: MovieDetail;
  updateData: (newMovieDetail: MovieDetail | undefined) => void;
  onUpdate: () => void;
}
const ViewMoviesModal: FC<ViewMoviesModalProps> = ({showModal, data, updateData, onUpdate}) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(showModal)
  }, [showModal])
  
  return (
    <Modal show={show} onHide={() => {
      setShow(false)
      updateData(undefined)
    }} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{`Editing Movie ${data.name}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <label className="form-label me-1">Start Date:</label>
              <DatePicker
                disabled={dayjs(data.startDate).isBefore(dayjs())}
                selected={dayjs(data.startDate).toDate()}
                onChange={(date) =>
                  updateData(data ? { ...data, startDate: dayjs(date).format('YYYY-MM-DDTHH:mm:ss')} : data)
                }
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
                customInput={<input id="startdate" className="form-control"/>}
                minDate={new Date()}
              />
            </div>
            <div className="col-6">
              <label className="form-label me-1">End Date:</label>
              <DatePicker
                selected={dayjs(data.endDate).toDate()}
                onChange={(date) =>
                  updateData(data ? { ...data, endDate: dayjs(date).format('YYYY-MM-DDTHH:mm:ss')} : data)
                }
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
                customInput={<input className="form-control"/>}
                minDate={dayjs(data?.startDate).toDate()}
              />
            </div>
            <div className="col-12">
              <label className="form-label me-1">Rating</label>
              <input type="text" className="form-control mb-1" value={data.rating} onChange={(eve) => updateData({...data, rating: eve.target.value})}></input>
            </div>
            <div className="col-6">
              <input className="form-check-input me-1" type="checkbox" role="switch" checked={data.active} onChange={(eve) => updateData({...data, active: eve.target.checked})}/>
              <label className="form-check-label">Active</label>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setShow(false)
          updateData(undefined)
        }}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
          onUpdate()
          setShow(false)
          updateData(undefined)
        }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewMoviesModal