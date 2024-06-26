package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.HallDto.HallCreateDto;
import com.baseus.bookingsystem.dto.HallDto.HallUpdateDto;
import com.baseus.bookingsystem.entity.Hall;

import java.util.List;

public interface HallService {
    String save(HallCreateDto hallCreateDto);
    List<Hall> findAll();
    Hall findById(int id);
    String delete(int id);
    String update(HallUpdateDto hallUpdateDto);
}
