import { FC, useEffect, useState } from "react";
import { ViewHallDto } from ".";
import { Button, Modal } from "react-bootstrap";

type ViewHallsModalProps = {
  showModal: boolean;
  data: ViewHallDto;
  updateData: (newHallDetail: ViewHallDto | undefined) => void;
  onUpdate: () => void;
}
const ViewHallsModal: FC<ViewHallsModalProps> = ({showModal, data, updateData, onUpdate}) => {
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
        <Modal.Title>{`Editing Hall with Id: ${data.id}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <label className="form-label">name:</label>
              <input type="text" className="form-control mb-1" value={data.name} onChange={(eve) => updateData({...data, name: eve.target.value})}></input>
            </div>
            <div className="col-12">
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

export default ViewHallsModal