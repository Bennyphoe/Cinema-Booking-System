package com.baseus.bookingsystem.controller;

import com.baseus.bookingsystem.entity.Movie;
import com.baseus.bookingsystem.service.MovieService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {

    private MovieService movieService;

    @PostMapping()
    public String save(@RequestBody Movie movie) {
        return movieService.save(movie);
    }

    @PutMapping()
    public String update(@RequestBody Movie movie) {
        return movieService.update(movie);
    }

    @DeleteMapping("/{movieId}")
    public String delete(@PathVariable("movieId") int movieId) {
        return movieService.delete(movieId);
    }

    @GetMapping()
    public List<Movie> getAll() {
        return movieService.findAll();
    }

    @GetMapping("/{movieId}")
    public Movie getMovieById(@PathVariable("movieId") int movieId) {
        return movieService.findById(movieId);
    }

    @GetMapping("/showing")
    public List<Movie> getShowingMovies() {
        return movieService.findAllShowing();
    }
}
