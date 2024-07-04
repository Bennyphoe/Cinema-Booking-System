import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToastHook } from "../../hooks/ToastHook";
import RegisterAdmin from "./RegisterAdmin/RegisterAdmin";
import CreateMovie from "./CreateMovie/CreateMovie";
import ViewMovies from "./ViewMovies/ViewMovies";
import CreateHall from "./CreateHall";
import ViewHalls from "./ViewHalls";
import CreateShowtime from "./CreateShowtime";
import ViewShowtimes from "./ViewShowtimes";


const AdminLandingPage: FC = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const { createToaster, toggleToaster } = useToastHook()
  const ToasterComponent = createToaster()
  
  

  const logout = () => {
    sessionStorage.removeItem("jwtToken")
    sessionStorage.removeItem("roles")
    navigate("/")
  }

  

  const capitalizedUsername = (username?.charAt(0).toUpperCase())?.concat(username?.substring(1)) 
  return (
    <div className="container-fluid min-vh-100">
        {ToasterComponent}
        <div className="d-flex justify-content-between p-2">
          <h2 className="pt-2">Welcome {capitalizedUsername}</h2>
          <a className="nav-link active pt-2" href="#" onClick={logout}>
            <i className="pe-1 bi bi-box-arrow-left"></i>
            Logout
          </a>
        </div>
        <RegisterAdmin toggleToaster={toggleToaster}/>
        <CreateMovie toggleToaster={toggleToaster}/>
        <ViewMovies toggleToaster={toggleToaster} />
        <CreateHall toggleToaster={toggleToaster} />
        <ViewHalls toggleToaster={toggleToaster} />
        <CreateShowtime toggleToaster={toggleToaster}/>
        <ViewShowtimes toggleToaster={toggleToaster}/>
    </div>
    
  )
}

export default AdminLandingPage