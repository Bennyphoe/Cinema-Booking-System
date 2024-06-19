import { FC, useState } from "react";
import './styles.css'

const Login: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  const submitCredentials = async() => {
    fetch("http://localhost:8080/api/auth/login", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        password
      })
    }).then(response => {
      if (response.ok) return response.json()
      return new Error(`Error: ${response.status}, invalid username or password!`)
    }).then(data => console.log(data)).catch(error => console.log(error))
  }

  return (
    <div className="container d-flex justify-content-center align-items-center bg-transparent flex-column min-vh-100">
      <h3 className="title">Sign in as Admin</h3>
      <div className="container d-flex flex-column" style={{width: "600px"}}>
        <div className="row mb-4">
          <label htmlFor="username" className="col-2 col-form-label">Username</label>
          <div className="col-10">
            <input type="text" className="form-control" id="username" placeholder="Enter Username" value={username} onChange={(eve) => setUsername(eve.target.value)}/>
          </div>
        </div>
        <div className="row mb-4">
          <label htmlFor="password" className="col-2 col-form-label">Password</label>
          <div className="col-10">
            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(eve) => setPassword(eve.target.value)}/>
          </div>
        </div>
        
        <button className="btn btn-primary ms-auto" onClick={submitCredentials} disabled={!username || !password}>Sign in</button>
        
      </div>
    </div>
  )
}

export default Login