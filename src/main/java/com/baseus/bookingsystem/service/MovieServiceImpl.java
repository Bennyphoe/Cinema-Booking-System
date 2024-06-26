package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.entity.Movie;
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
        movieRepository.delete(movie);
        return "movie with id: " + id + " is successfully deleted";
    }

    @Transactional
    @Override
    public String update(Movie movie) {
        movieRepository.save(movie);
        return "movie with id: " + movie.getId() + " is successfully updated";
    }

    @Override
    public List<Movie> findAllShowing() {
        //retrieve movies that have startDate >= current dateTime and endDate <= current dateTime

        //order by StartDate
        LocalDateTime currentDate = LocalDateTime.now();
        TypedQuery<Movie> theQuery = entityManager.createQuery("SELECT m from Movie m WHERE m.startDate <= :currDate AND m.endDate >= :currDate ORDER BY m.startDate", Movie.class);
        theQuery.setParameter("currDate", currentDate);
        return theQuery.getResultList();
    }
}
