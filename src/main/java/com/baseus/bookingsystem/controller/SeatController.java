package com.baseus.bookingsystem.controller;

import com.baseus.bookingsystem.dto.SeatDto.SeatReserveDto;
import com.baseus.bookingsystem.dto.SeatDto.SeatUpdateDto;
import com.baseus.bookingsystem.entity.Seat;
import com.baseus.bookingsystem.service.SeatService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/seats")
public class SeatController {

    private SeatService seatService;

    @GetMapping("/{seatId}")
    public Seat findById(@PathVariable int seatId) {
        return seatService.findById(seatId);
    }

    @GetMapping
    public List<SeatReserveDto> getListOfSeatsByShowtimeAndHall(@RequestParam("hall") int hallId, @RequestParam("showtime") int showtimeId) {
        return seatService.getListOfSeatsByShowtimeAndHall(hallId, showtimeId);
    }

}
