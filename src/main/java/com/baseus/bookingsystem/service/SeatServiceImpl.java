package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.SeatDto.SeatUpdateDto;
import com.baseus.bookingsystem.entity.Seat;
import com.baseus.bookingsystem.exception.APIException;
import com.baseus.bookingsystem.repository.SeatRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class SeatServiceImpl implements SeatService{

    private SeatRepository SeatRepository;

    @Transactional
    @Override
    public String save(Seat seat) {
        Seat savedSeat = SeatRepository.save(seat);
        return "Successfully saved movie: " + savedSeat.getId();
    }

    @Override
    public List<Seat> findAll() {
        return SeatRepository.findAll();
    }

    @Override
    public Seat findById(int id) {
        return SeatRepository.findById(id).orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "Seat with id" + id + " does not exist"));
    }

    @Transactional
    @Override
    public String delete(int id) {
        Seat seat = findById(id);
        SeatRepository.delete(seat);
        return "Seat with id: " + id + " is successfully deleted";
    }

    @Transactional
    @Override
    public String update(SeatUpdateDto seatUpdateDto) {
        Seat seatToUpdate = findById(seatUpdateDto.getId());
        seatToUpdate.setAvailable(seatUpdateDto.isAvailable());
        SeatRepository.save(seatToUpdate);
        return "Seat with id: " + seatToUpdate.getId() + " is successfully updated";
    }
}
