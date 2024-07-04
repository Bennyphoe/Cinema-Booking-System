import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Login from './pages/Login'
import AdminLandingPage from './pages/AdminLandingPage'
import ShowtimePage from './pages/ShowtimesPage'
import SeatSelectionPage from './pages/SeatSelectionPage'
import ProtectedRoute from './routing/ProtectedRoute'
import NotFound from './routing/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/:username" element={<AdminLandingPage />}/>
        </Route>
        <Route path="/showtime" element={<ShowtimePage />} />
        <Route path="/showtime/movie/:movieId" element={<ShowtimePage />}/>
        <Route path="/seatSelection/:showtimeId" element={<SeatSelectionPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
