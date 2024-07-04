package com.baseus.bookingsystem.controller;

import com.baseus.bookingsystem.dto.ShowtimeDto.*;
import com.baseus.bookingsystem.entity.Showtime;
import com.baseus.bookingsystem.service.ShowtimeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    private ShowtimeService showtimeService;

    @PostMapping
    public String save(@RequestBody ShowtimeCreateDto showtimeCreateDto) {
        return showtimeService.save(showtimeCreateDto);
    }

    @GetMapping
    public List<ShowtimeMovieDto> findShowTimesForAllMoviesByDate(@RequestParam("date") String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate inputDate = LocalDate.parse(date, formatter);
        return showtimeService.findShowTimesForAllMoviesByDate(inputDate);
    }

    @GetMapping("movies/{movieId}")
    public List<ShowtimeInfo> findShowTimesByMovieIdAndDate(@PathVariable int movieId, @RequestParam("date") String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate inputDate = LocalDate.parse(date, formatter);
        return showtimeService.findShowTimesByMovieIdAndDate(movieId, inputDate);
    }

    @GetMapping("/{showtimeId}")
    public ShowtimeMovieHallDto findById(@PathVariable int showtimeId) {
        return showtimeService.findById(showtimeId);
    }

    @GetMapping("/all")
    public List<ShowtimeDto> findAll() {
        return showtimeService.findAll();
    }

    @DeleteMapping("/{showtimeId}")
    public String delete(@PathVariable int showtimeId) {
        return showtimeService.delete(showtimeId);
    }
}
