package com.baseus.bookingsystem.dto.HallDto;

import com.baseus.bookingsystem.dto.ShowtimeDto.ShowtimeWithStartAndEndInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HallActiveWithShowtimes {
    private int id;
    private String name;
    private List<ShowtimeWithStartAndEndInfo> showtimes;
}
