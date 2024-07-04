import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  const navigate = useNavigate()
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column gap-2 justify-content-center align-items-center">
      <h2>Page Not Found!</h2>
      <button className="btn btn-primary px-4 py-2" onClick={() => navigate("/")}>
        <span>Return Home</span>
        <i className="ms-2 bi bi-house-door-fill"></i>
      </button>
    </div>
  )
}

export default NotFound