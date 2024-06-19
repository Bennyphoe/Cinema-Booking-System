import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
