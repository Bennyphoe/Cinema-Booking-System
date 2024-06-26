package com.baseus.bookingsystem.controller;

import com.baseus.bookingsystem.dto.SeatDto.SeatUpdateDto;
import com.baseus.bookingsystem.service.SeatService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/seats")
public class SeatController {

    private SeatService seatService;

    @PutMapping
    public String update(@RequestBody SeatUpdateDto seatUpdateDto) {
        return seatService.update(seatUpdateDto);
    }
}
