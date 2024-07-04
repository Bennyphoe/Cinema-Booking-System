package com.baseus.bookingsystem.controller;

import com.baseus.bookingsystem.dto.HallDto.HallActiveWithShowtimes;
import com.baseus.bookingsystem.dto.HallDto.HallCreateDto;
import com.baseus.bookingsystem.dto.HallDto.HallUpdateDto;
import com.baseus.bookingsystem.entity.Hall;
import com.baseus.bookingsystem.service.HallService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/halls")
@AllArgsConstructor
public class HallController {

    private HallService hallService;

    @PostMapping
    public String save(@RequestBody HallCreateDto hallCreateDto) {
        return hallService.save(hallCreateDto);
    }

    @PutMapping
    public String update(@RequestBody HallUpdateDto hallUpdateDto) {
        return hallService.update(hallUpdateDto);
    }

    @GetMapping
    public List<Hall> findAll() {
        return hallService.findAll();
    }

    @GetMapping("/{hallId}")
    public Hall findById(@PathVariable int hallId) {
        return hallService.findById(hallId);
    }

    @DeleteMapping("/{hallId}")
    public String deleteById(@PathVariable int hallId) {
        //to delete a hall need to make sure that there are no showTimes scheduled, have to delete the showTimes first
        return hallService.delete(hallId);
    }

    @GetMapping("/active")
    public List<HallActiveWithShowtimes> findActiveHallsWithShowtimes() {
        return hallService.findActiveHallsWithShowtimes();
    }
}
