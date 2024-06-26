import { FC, useState } from "react";
import { MovieDetail } from "../../pages/Home/typings";
import "./styles.css"
import { formatMinutes } from "../../utils/formatTime";

type MovieCardProps = {
  movie: MovieDetail,
  mouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

const MovieCard: FC<MovieCardProps> = ({movie, mouseDown}) => {
  const [hoverState, setHoverState] = useState<boolean>(false)
  return (
    <div className="movie-card-container" onMouseDown={mouseDown} onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)}>
      {hoverState && <div className="movie-card-overlay">
        <div className="movie-card-title">{movie.name}</div>
        <hr/>
        <div className="movie-card-body">
          <span>{formatMinutes(movie.duration)} | {movie.rating}</span>
          <button className="btn btn-danger col-10 card-btn">Buy</button>
        </div>
      </div>}
      <img src={`/${movie.image}.jpg`} className="img-fluid" alt="Movie-Image"/>
    </div>
  )
}

export default MovieCard