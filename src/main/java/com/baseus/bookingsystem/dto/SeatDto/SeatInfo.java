package com.baseus.bookingsystem.dto.SeatDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SeatInfo {
    private int id;
    private int rowIdx;
    private int colIdx;
    private boolean available;
}
