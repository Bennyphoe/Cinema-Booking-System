package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.entity.Movie;
import com.baseus.bookingsystem.exception.APIException;
import com.baseus.bookingsystem.repository.MovieRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {

    private MovieRepository movieRepository;

    @Transactional
    @Override
    public String save(Movie movie) {
//        Movie newMovie = new Movie();
//        newMovie.setName(movie.getName());
//        newMovie.setDuration(movie.getDuration());
//        newMovie.setStartDate(movie.getStartDate());
//        newMovie.setEndDate(movie.getEndDate());
//        newMovie.setRating(movie.getRating());
//        newMovie.setImage(movie.getImage());
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
}
