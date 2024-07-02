import { FC, ReactNode, useState } from "react"
import { Button, Modal } from "react-bootstrap";

type ModalProps = {
  onSubmit: () => void;
  onClose: () => void;
  headerText: string;
  children: ReactNode;
}

export const useModalHook = () => {
  const [show, setShow] = useState<boolean>(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ModalComponent: FC<ModalProps> = ({onSubmit, onClose, headerText, children}) => {
    return (
      <Modal show={show} onHide={() => {
        onClose()
        handleClose()
      }} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{headerText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            onClose()
            handleClose()
          }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            onSubmit()
            handleClose()
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  return {ModalComponent, handleShow, handleClose}
  
}