package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.MovieDto.MovieActiveDto;
import com.baseus.bookingsystem.entity.Movie;

import java.util.List;

public interface MovieService {
    String save(Movie movie);
    List<Movie> findAll();
    Movie findById(int id);
    String delete(int id);
    String update(Movie movie);
    List<Movie> findAllShowing();
}
