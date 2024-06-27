package com.baseus.bookingsystem.dto.HallDto;


import com.baseus.bookingsystem.dto.SeatDto.SeatInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HallCreateDto {
    private String name;

    private int rowCount;

    private int colCount;

}
