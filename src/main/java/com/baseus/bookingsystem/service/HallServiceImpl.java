package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.HallDto.HallCreateDto;
import com.baseus.bookingsystem.dto.HallDto.HallUpdateDto;
import com.baseus.bookingsystem.dto.SeatDto.SeatInfo;
import com.baseus.bookingsystem.entity.Hall;
import com.baseus.bookingsystem.entity.Seat;
import com.baseus.bookingsystem.exception.APIException;
import com.baseus.bookingsystem.repository.HallRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class HallServiceImpl implements HallService{

    private HallRepository hallRepository;

    @Transactional
    @Override
    public String save(HallCreateDto hallCreateDto) {
        Hall newHall = new Hall(hallCreateDto.getName(), hallCreateDto.getRowCount(), hallCreateDto.getColCount());
        List<SeatInfo> seatInfos = hallCreateDto.getSeats();
        if (seatInfos != null) {
            for (SeatInfo seatInfo: seatInfos) {
                newHall.addSeat(new Seat(seatInfo.isAvailable(), seatInfo.getRowIdx(), seatInfo.getColIdx()));
            }
        }
        Hall savedHall = hallRepository.save(newHall);
        return "Successfully saved hall: " + savedHall.getId();
    }

    @Override
    public List<Hall> findAll() {
        return hallRepository.findAll();
    }

    @Override
    public Hall findById(int id) {
        return hallRepository.findById(id).orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "Hall with id" + id + " does not exist"));
    }

    @Transactional
    @Override
    public String delete(int id) {
        Hall hall = findById(id);
        hallRepository.delete(hall);
        return "hall with id: " + id + " is successfully deleted";
    }

    @Transactional
    @Override
    public String update(HallUpdateDto hallUpdateDto) {
        Hall toUpdateHall = findById(hallUpdateDto.getId());
        toUpdateHall.setName(hallUpdateDto.getName());
        hallRepository.save(toUpdateHall);
        return "hall with id: " + toUpdateHall.getId() + " is successfully updated";
    }
}
