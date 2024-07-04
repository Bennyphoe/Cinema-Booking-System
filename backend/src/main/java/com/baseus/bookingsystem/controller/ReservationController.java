package com.baseus.bookingsystem.controller;

import com.baseus.bookingsystem.dto.ReservationDto.ReservationCreateDto;
import com.baseus.bookingsystem.dto.ReservationDto.ReservationDto;
import com.baseus.bookingsystem.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {

    private ReservationService reservationService;

    @PostMapping
    public String save(@RequestBody ReservationCreateDto reservationCreateDto) {
        return reservationService.save(reservationCreateDto);
    }

    @GetMapping
    public List<ReservationDto> findAll() {
        return reservationService.findAll();
    }

}
