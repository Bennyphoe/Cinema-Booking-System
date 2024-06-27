package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.SeatDto.SeatReserveDto;
import com.baseus.bookingsystem.entity.Reservation;
import com.baseus.bookingsystem.entity.Seat;
import com.baseus.bookingsystem.exception.APIException;
import com.baseus.bookingsystem.repository.HallRepository;
import com.baseus.bookingsystem.repository.SeatRepository;
import com.baseus.bookingsystem.repository.ShowtimeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@AllArgsConstructor
public class SeatServiceImpl implements SeatService{

    private SeatRepository SeatRepository;
    private ShowtimeRepository showtimeRepository;
    private HallRepository hallRepository;

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

    @Override
    public List<SeatReserveDto> getListOfSeatsByShowtimeAndHall(int hallId, int showtimeId) {
        //Get list of seats based on reservations connected to a showtime
        List<Reservation> reservations = showtimeRepository.findById(showtimeId).orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "No such showtime with id: " + showtimeId)).getReservations();
        List<Seat> seats = reservations.stream().flatMap(reservation -> reservation.getSeats().stream()).toList();
        //put into Hashset
        HashSet<Integer> seatsWithReservation = new HashSet<>();
        for (Seat seat: seats) {
            seatsWithReservation.add(seat.getId());
        }
        //get the list of seats in the hall
        List<Seat> seatsInHall = hallRepository.findById(hallId).orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "No such Hall with id: " + hallId)).getSeats();
        //create SeatReserveDto based on list of seats and whether id is in hashset and return list
        return getSeatReserveDtos(seatsInHall, seatsWithReservation);
    }

    private static List<SeatReserveDto> getSeatReserveDtos(List<Seat> seatsInHall, HashSet<Integer> seatsWithReservation) {
        List<SeatReserveDto> list = new ArrayList<>();
        for (Seat seat: seatsInHall) {
            SeatReserveDto seatReserveDto = new SeatReserveDto();
            seatReserveDto.setId(seat.getId());
            seatReserveDto.setReserved(seatsWithReservation.contains(seat.getId()));
            seatReserveDto.setColIdx(seat.getColIdx());
            seatReserveDto.setRowIdx(seat.getRowIdx());
            list.add(seatReserveDto);
        }
        return list;
    }

}
