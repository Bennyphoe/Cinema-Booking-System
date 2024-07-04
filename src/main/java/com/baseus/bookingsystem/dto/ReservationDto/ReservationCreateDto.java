package com.baseus.bookingsystem.dto.ReservationDto;

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
public class ReservationCreateDto {
    private String email;
    private LocalDateTime reservationDate;
    private int showtimeId;
    private List<Integer> seatIds;
}
