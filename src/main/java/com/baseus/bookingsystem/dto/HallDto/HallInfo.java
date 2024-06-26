package com.baseus.bookingsystem.dto.HallDto;

import com.baseus.bookingsystem.dto.SeatDto.SeatInfo;
import com.baseus.bookingsystem.entity.Hall;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class HallInfo {
    private int id;
    private String name;
    private int rowCount;
    private int colCount;
    private List<SeatInfo> seatInfos;

    public HallInfo(Hall hall) {
        this.id = hall.getId();
        this.name = hall.getName();
        this.rowCount = hall.getRowCount();
        this.colCount = hall.getColCount();
        this.seatInfos = hall.getSeats().stream().map(seat -> new SeatInfo(seat.getId(), seat.getRowIdx(), seat.getColIdx(), seat.isAvailable())).collect(Collectors.toList());
    }
}
