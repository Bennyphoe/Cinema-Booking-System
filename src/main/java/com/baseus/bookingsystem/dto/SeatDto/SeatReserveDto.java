package com.baseus.bookingsystem.dto.SeatDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SeatReserveDto {
    private int id;
    private boolean reserved;
    private int rowIdx;
    private int colIdx;
}
