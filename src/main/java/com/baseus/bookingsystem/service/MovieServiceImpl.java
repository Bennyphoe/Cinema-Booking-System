package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.MovieDto.MovieActiveDto;
import com.baseus.bookingsystem.entity.Movie;
import com.baseus.bookingsystem.entity.Showtime;
import com.baseus.bookingsystem.exception.APIException;
import com.baseus.bookingsystem.repository.MovieRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {

    private MovieRepository movieRepository;
    private EntityManager entityManager;

    @Transactional
    @Override
    public String save(Movie movie) {
        Movie savedMovie = movieRepository.save(movie);
        return "Successfully saved movie: " + savedMovie.getName();
    }

    @Override
    public List<Movie> findAll() {
        return movieRepository.findAll();
    }

    @Override
    public Movie findById(int id) {
        return movieRepository.findById(id).orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "Movie with id" + id + " does not exist"));
    }

    @Transactional
    @Override
    public String delete(int id) {
        Movie movie = findById(id);
        List<Showtime> movieShowtime = movie.getShowTimes();
        if (!movieShowtime.isEmpty()) throw new APIException(HttpStatus.BAD_REQUEST, "Can't delete a movie with showtimes. Suggest to set it to inactive!");
        movieRepository.delete(movie);
        return "movie with id: " + id + " is successfully deleted";
    }

    @Transactional
    @Override
    public String update(Movie movie) {
        LocalDateTime newStart = movie.getStartDate();
        LocalDateTime newEnd = movie.getEndDate();
        Movie oldVersion = findById(movie.getId());
        LocalDateTime previousStart = oldVersion.getStartDate();
        LocalDateTime previousEnd = oldVersion.getEndDate();
        //if start is updated but is before current Date Or end is updated but is before the updated start. throw error
        if ((!newStart.isEqual(previousStart) && newStart.isBefore(LocalDateTime.now())) || newEnd.isBefore(newStart)) throw new APIException(HttpStatus.BAD_REQUEST, "Start Date or End Date is invalid!");
        //get the showtimes within the previous timeframe

        TypedQuery<Showtime> queryForShowtimesWithinPreviousTimeframe = entityManager.createQuery("SELECT st from Showtime st WHERE st.time >= :startDate AND st.time <= :endDate AND st.time > :currentDate", Showtime.class);
        queryForShowtimesWithinPreviousTimeframe.setParameter("startDate", previousStart);
        queryForShowtimesWithinPreviousTimeframe.setParameter("endDate", previousEnd);
        queryForShowtimesWithinPreviousTimeframe.setParameter("currentDate", LocalDateTime.now());
        List<Showtime> showtimes = queryForShowtimesWithinPreviousTimeframe.getResultList();
        for (Showtime showtime: showtimes) {
            if (!showtime.getTime().isAfter(newStart) || !showtime.getTime().isBefore(newEnd)) throw new APIException(HttpStatus.BAD_REQUEST, "there are showtimes that do not fall within the new start & end dates");
        }
        movieRepository.save(movie);
        return "movie with id: " + movie.getId() + " is successfully updated";
    }

    @Override
    public List<Movie> findAllShowing() {
        //retrieve movies that have startDate >= current dateTime and endDate <= current dateTime

        //order by StartDate
        LocalDateTime currentDate = LocalDateTime.now();
        TypedQuery<Movie> theQuery = entityManager.createQuery("SELECT m from Movie m WHERE m.active = true AND m.startDate <= :currDate AND m.endDate >= :currDate ORDER BY m.startDate", Movie.class);
        theQuery.setParameter("currDate", currentDate);
        return theQuery.getResultList();
    }



}
