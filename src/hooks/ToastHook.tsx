import { ReactElement, useState } from "react"
import { Toast, ToastBody, ToastContainer } from "react-bootstrap"

export const useToastHook = () => {
  const [show, setShow] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")

  const toggleToaster = (message: string) => {
    setDescription(message)
    setShow(true)
  }

  const createToaster = (): ReactElement => {
    return (
      <>
        {show && description && 
        <ToastContainer position="top-center" style={{ zIndex: 1 }} className="p-3">
          <Toast show={show} onClose={() => setShow(false)} delay={5000} bg="success" autohide={true}>
            <ToastBody>{description}</ToastBody>
          </Toast>
        </ToastContainer>
        }
      </>
    )
  }

  return {
    toggleToaster,
    createToaster
  }
}
