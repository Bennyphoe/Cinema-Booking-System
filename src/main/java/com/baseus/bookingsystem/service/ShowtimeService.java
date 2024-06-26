package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.ShowtimeDto.ShowtimeCreateDto;
import com.baseus.bookingsystem.dto.ShowtimeDto.ShowtimeInfo;
import com.baseus.bookingsystem.dto.ShowtimeDto.ShowtimeMovieDto;
import com.baseus.bookingsystem.dto.ShowtimeDto.ShowtimeMovieHallDto;
import com.baseus.bookingsystem.entity.Showtime;

import java.time.LocalDate;
import java.util.List;

public interface ShowtimeService {
    String save(ShowtimeCreateDto showtimeCreateDto);
    List<ShowtimeMovieDto> findShowTimesForAllMoviesByDate(LocalDate date);
    List<ShowtimeInfo> findShowTimesByMovieIdAndDate(int movieId, LocalDate date);
    ShowtimeMovieHallDto findById(int id);
    String delete(int id);
}
