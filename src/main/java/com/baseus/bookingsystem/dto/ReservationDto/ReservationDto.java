package com.baseus.bookingsystem.dto.ReservationDto;

import com.baseus.bookingsystem.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReservationDto {
    private int id;
    private int showtime;
    private List<Integer> seats;
    private String email;
    private LocalDateTime reservationDate;

}
