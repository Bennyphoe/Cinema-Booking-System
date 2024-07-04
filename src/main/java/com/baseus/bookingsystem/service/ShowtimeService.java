package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.ShowtimeDto.*;
import com.baseus.bookingsystem.entity.Showtime;

import java.time.LocalDate;
import java.util.List;

public interface ShowtimeService {
    String save(ShowtimeCreateDto showtimeCreateDto);
    List<ShowtimeMovieDto> findShowTimesForAllMoviesByDate(LocalDate date);
    List<ShowtimeInfo> findShowTimesByMovieIdAndDate(int movieId, LocalDate date);
    ShowtimeMovieHallDto findById(int id);
    List<ShowtimeDto> findAll();
    String delete(int id);
}
