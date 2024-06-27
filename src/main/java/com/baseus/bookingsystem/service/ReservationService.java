package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.ReservationDto.ReservationCreateDto;
import com.baseus.bookingsystem.dto.ReservationDto.ReservationDto;

import java.util.List;

public interface ReservationService {
    public String save(ReservationCreateDto reservationCreateDto);
    public List<ReservationDto> findAll();
}
