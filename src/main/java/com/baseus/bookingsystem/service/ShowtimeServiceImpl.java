package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.HallDto.HallInfo;
import com.baseus.bookingsystem.dto.MovieDto.MovieInfo;
import com.baseus.bookingsystem.dto.ShowtimeDto.*;
import com.baseus.bookingsystem.entity.Hall;
import com.baseus.bookingsystem.entity.Movie;
import com.baseus.bookingsystem.entity.Reservation;
import com.baseus.bookingsystem.entity.Showtime;
import com.baseus.bookingsystem.exception.APIException;
import com.baseus.bookingsystem.repository.HallRepository;
import com.baseus.bookingsystem.repository.MovieRepository;
import com.baseus.bookingsystem.repository.ShowtimeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShowtimeServiceImpl implements ShowtimeService{
    
    private ShowtimeRepository showtimeRepository;
    private MovieRepository movieRepository;
    private HallRepository hallRepository;
    private EntityManager entityManager;


    private boolean hasClash(Showtime current, Showtime existing) {
        LocalDateTime start = current.getTime();
        LocalDateTime end = current.getTime().plusMinutes(current.getMovie().getDuration());
        LocalDateTime existingStart = existing.getTime();
        LocalDateTime existingEnd = existing.getTime().plusMinutes(existing.getMovie().getDuration());
        return (start.isEqual(existingEnd) || start.isBefore(existingEnd)) && (end.isAfter(existingStart) || end.isEqual(existingStart));
    }

    @Transactional
    @Override
    public String save(ShowtimeCreateDto showtimeCreateDto) {
        Showtime newShowtime = new Showtime(showtimeCreateDto.getTime());
        Movie attachedMovie = movieRepository.findById(showtimeCreateDto.getMovieId()).orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "Movie with Id: " + showtimeCreateDto.getMovieId() + "can't be found!"));
        Hall attachedHall = hallRepository.findById(showtimeCreateDto.getHallId()).orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "Hall with Id: " + showtimeCreateDto.getHallId() + "can't be found!"));
        if (newShowtime.getTime().isBefore(attachedMovie.getStartDate()) || newShowtime.getTime().isAfter(attachedMovie.getEndDate())) throw new APIException(HttpStatus.BAD_REQUEST, "show time is not valid for the movie");
        newShowtime.setMovie(attachedMovie);
        //need to check if hall already has a showtime during that period
        List<Showtime> hallShowTimes = attachedHall.getShowTimes();
        for (Showtime showtime: hallShowTimes) {
            if (hasClash(newShowtime, showtime)) throw new APIException(HttpStatus.BAD_REQUEST, "There is a clash with another showTime of id: " + showtime.getId());
        }
        attachedMovie.addShowtime(newShowtime);
        attachedHall.addShowtime(newShowtime);
        Showtime savedShowtime = showtimeRepository.save(newShowtime);
        return "Successfully saved Showtime: " + savedShowtime.getId();
    }

    @Override
    public List<ShowtimeMovieDto> findShowTimesForAllMoviesByDate(LocalDate date) {
        LocalDateTime currentDateTime = LocalDateTime.of(date, date.isEqual(LocalDate.now()) ? LocalTime.now() : LocalTime.MIN);
        LocalDateTime endDateTime = LocalDateTime.of(date, LocalTime.MAX);
        List<ShowtimeMovieDto> list = new ArrayList<>();
        List<Movie> allMovies = movieRepository.findAll();
        for (Movie movie: allMovies) {
            ShowtimeMovieDto showtimeMovieDto = new ShowtimeMovieDto();
            showtimeMovieDto.setMovie(new MovieInfo(movie));
            TypedQuery<Showtime> theQuery = entityManager.createQuery("SELECT st from Showtime st JOIN st.movie m WHERE m.id=:movieId AND st.time > :time AND st.time < :endTime ORDER BY st.time", Showtime.class);
            theQuery.setParameter("movieId", movie.getId());
            theQuery.setParameter("endTime", endDateTime);
            theQuery.setParameter("time", currentDateTime);
            List<Showtime> showTimes = theQuery.getResultList();
            showtimeMovieDto.setShowtimes(showTimes.stream().map(showtime -> new ShowtimeInfo(showtime.getId(), showtime.getTime())).collect(Collectors.toList()));
            list.add(showtimeMovieDto);
        }
        return list;
    }

    @Override
    public List<ShowtimeInfo> findShowTimesByMovieIdAndDate(int movieId, LocalDate date) {
        LocalDateTime currentDateTime = LocalDateTime.of(date, LocalTime.now());
        LocalDateTime endDateTime = LocalDateTime.of(date, LocalTime.MAX);
        TypedQuery<Showtime> theQuery = entityManager.createQuery("SELECT st from Showtime st JOIN st.movie m WHERE m.id=:movieId AND st.time > :time AND st.time < :endTime ORDER BY st.time", Showtime.class);
        theQuery.setParameter("movieId", movieId);
        theQuery.setParameter("endTime", endDateTime);
        theQuery.setParameter("time", currentDateTime);
        return theQuery.getResultList().stream().map(showTime -> new ShowtimeInfo(showTime.getId(), showTime.getTime())).collect(Collectors.toList());

    }


    @Override
    public ShowtimeMovieHallDto findById(int id) {
        TypedQuery<Showtime> theQuery = entityManager.createQuery("SELECT st FROM Showtime st WHERE st.id=:id", Showtime.class);
        theQuery.setParameter("id", id);
        Showtime showTime = theQuery.getSingleResult();
        if (showTime == null) throw new APIException(HttpStatus.BAD_REQUEST, "showtime with id: " + id + " cannot be found!");
        return new ShowtimeMovieHallDto(showTime.getId(), showTime.getTime(), new MovieInfo(showTime.getMovie()), new HallInfo(showTime.getHall()));
    }

    @Override
    public List<ShowtimeDto> findAll() {
        TypedQuery<Showtime> queryShowTimes = entityManager.createQuery("SELECT st FROM Showtime st JOIN FETCH st.movie JOIN FETCH st.hall ORDER BY st.id DESC", Showtime.class);
        List<Showtime> showTimes = queryShowTimes.getResultList();
        return showTimes.stream().map(ShowtimeDto::new).toList();
    }

    @Override
    public String delete(int id) {
        Showtime showTimeToDelete = entityManager.find(Showtime.class, id);
        if (showTimeToDelete.getTime().isBefore(LocalDateTime.now())) throw new APIException(HttpStatus.BAD_REQUEST, "Cant delete a showtime that has already happen!");
        //set reservation's showtime to null so that it's removed by orphan removal
        List<Reservation> attachedReservations = showTimeToDelete.getReservations();
        for (Reservation reservation: attachedReservations) {
            reservation.setShowtime(null);
        }
        showtimeRepository.delete(showTimeToDelete);
        return "Successfully deleted Showtime: " + id;
    }
}
