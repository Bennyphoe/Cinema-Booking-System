package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.ReservationDto.ReservationCreateDto;
import com.baseus.bookingsystem.dto.ReservationDto.ReservationDto;
import com.baseus.bookingsystem.entity.Reservation;
import com.baseus.bookingsystem.entity.Seat;
import com.baseus.bookingsystem.entity.Showtime;
import com.baseus.bookingsystem.exception.APIException;
import com.baseus.bookingsystem.repository.ReservationRepository;
import com.baseus.bookingsystem.repository.ShowtimeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService{

    private ReservationRepository reservationRepository;
    private ShowtimeRepository showtimeRepository;
    private EntityManager entityManager;

    @Transactional
    @Override
    public String save(ReservationCreateDto reservationCreateDto) {
        Reservation newReservation = new Reservation(reservationCreateDto.getEmail(), reservationCreateDto.getReservationDate());
        //get the list of seats and also showtime
        Showtime selectedShowtime = showtimeRepository.findById(reservationCreateDto.getShowtimeId()).orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "No such Showtime with id: " + reservationCreateDto.getShowtimeId()));
        TypedQuery<Seat> theQuery = entityManager.createQuery("FROM Seat WHERE id IN :listOfIds", Seat.class);
        theQuery.setParameter("listOfIds", reservationCreateDto.getSeatIds());
        List<Seat> seats = theQuery.getResultList();
        for (Seat seat: seats) {
            newReservation.addSeat(seat);
        }
        selectedShowtime.addReservation(newReservation);
        reservationRepository.save(newReservation);
        return "Reservation of id: " + newReservation.getId() + " successfully created!";
    }

    @Override
    public List<ReservationDto> findAll() {
        List<Reservation> allReservations = reservationRepository.findAll();
        List<ReservationDto> list = new ArrayList<>();
        for (Reservation reservation: allReservations) {
            ReservationDto reservationDto = new ReservationDto();
            reservationDto.setId(reservation.getId());
            reservationDto.setEmail(reservation.getEmail());
            reservationDto.setReservationDate(reservation.getReservationDate());
            List<Seat> seats = reservation.getSeats();
            reservationDto.setSeats(seats.stream().map(Seat::getId).collect(Collectors.toList()));
            reservationDto.setShowtime(reservation.getShowtime().getId());
            list.add(reservationDto);
        }
        return list;
    }

}
