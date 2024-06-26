package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.SeatDto.SeatUpdateDto;
import com.baseus.bookingsystem.entity.Seat;

import java.util.List;

public interface SeatService {
    String save(Seat seat);
    List<Seat> findAll();
    Seat findById(int id);
    String delete(int id);
    String update(SeatUpdateDto seat);
}
