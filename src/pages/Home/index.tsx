import { FC } from "react";
import './styles.scss'

const Home: FC = () => {
  return (
    <div className="container min-vh-100">
      <nav className="navbar navbar-expand-lg bg-transparent pt-4">
        <div className="container-fluid">
          <a className="navbar-brand brand" href="#">Baseus Cinema</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-danger px-4 py-2">
                  <span>SHOWTIMES</span>
                  <i className="bi bi-calendar-week ms-2"></i>
                </button>
              </li>
            </ul>
            <a className="nav-link active login-btn" href="#">
              Log In (Admin)
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Home