import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Login from './pages/Login'
import AdminLandingPage from './pages/AdminLandingPage'
import ShowtimePage from './pages/ShowtimesPage'
import SeatSelectionPage from './pages/SeatSelectionPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/:username" element={<AdminLandingPage />}/>
        <Route path="/showtime" element={<ShowtimePage />} />
        <Route path="/showtime/movie/:movieId" element={<ShowtimePage />}/>
        <Route path="/seatSelection/:showtimeId" element={<SeatSelectionPage />} />
      </Route>
    </Routes>
  )
}

export default App
