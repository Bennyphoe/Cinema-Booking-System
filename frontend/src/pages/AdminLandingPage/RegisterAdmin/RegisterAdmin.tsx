import { FC, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useErrorHook } from "../../../hooks/ErrorHook";

type RegisterDetails = {
  username: string;
  password: string;
  roles: string[];
}

type RegisterAdminProps = {
  toggleToaster: (message: string) => void
}


const RegisterAdmin: FC<RegisterAdminProps> = ({toggleToaster}) => {

  const {setErrors, displayErrors} = useErrorHook()
  const ErrorComponent = displayErrors()
  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({username: "", password: "", roles: []})
  const [collapseRegister, setCollapseRegister] = useState<boolean>(true)

  const token = sessionStorage.getItem("jwtToken")

  const submitRegisterDetails = () => {
    fetch("http://localhost:8080/api/auth/register", {
      method: 'POST',
      headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`},
      body: JSON.stringify(registerDetails)
    }).then(response => {
      if (response.ok) return response.text()
      throw new Error(`Error: ${response.status}, There was an error registering new user!`)
    })
    .then(() => {
      console.log(`successfully created user: ${registerDetails.username}`)
      setRegisterDetails({username: "", password: "", roles: []})
      setCollapseRegister(true)
      toggleToaster(`successfully created user: ${registerDetails.username}`)
    })
    .catch(error => {
      setErrors([(error as Error).message])
    })
  }

  const onChangeRoles = (eve: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDetails(prev => {
      let currentRoles = [...prev.roles]
      if (eve.target.checked) {
        currentRoles.push(eve.target.value)
      } else {
        currentRoles = currentRoles.filter(role => role !== eve.target.value)
      }
      return {
        ...prev,
        roles: currentRoles
      }
    })
  }
  return (
    <div className="container mt-4 w-80">
      <button className="btn btn-primary"  aria-controls="register-collapse" aria-expanded={false} onClick={() => setCollapseRegister(!collapseRegister)}>
        Register New Admin or SuperAdmin
      </button>
      <Collapse in={!collapseRegister}>
        <div className="row g-3 mt-2">
          <div className="col-md-6 ps-0">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" value={registerDetails.username} onChange={(eve) => {
              setRegisterDetails(prev => {
                return {
                  ...prev,
                  username: eve.target.value
                }
              })
            }}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="text" className="form-control" id="password" value={registerDetails.password} onChange={(eve) => {
              setRegisterDetails(prev => {
                return {
                  ...prev,
                  password: eve.target.value
                }
              })
            }}/>
          </div>
          
          <div className="form-check col-12">
            <input className="form-check-input" type="checkbox" value="SUPERADMIN" id="superadmin" onChange={(eve) => onChangeRoles(eve)} checked={registerDetails.roles.includes("SUPERADMIN")}/>
            <label className="form-check-label" htmlFor="superadmin">
              Super Admin
            </label>
          </div>
          <div className="form-check col-12 mb-2">
            <input className="form-check-input" type="checkbox" value="ADMIN" id="admin" onChange={(eve) => onChangeRoles(eve)} checked={registerDetails.roles.includes("ADMIN")}/>
            <label className="form-check-label" htmlFor="admin">
              Admin
            </label>
          </div>
          <button className="btn btn-primary col-1" onClick={submitRegisterDetails}>submit</button>
          {ErrorComponent}
        </div>
      </Collapse>
    </div>
  )
}

export default RegisterAdmin