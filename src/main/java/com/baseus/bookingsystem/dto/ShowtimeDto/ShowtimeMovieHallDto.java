package com.baseus.bookingsystem.dto.ShowtimeDto;

import com.baseus.bookingsystem.dto.HallDto.HallInfo;
import com.baseus.bookingsystem.dto.MovieDto.MovieInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShowtimeMovieHallDto {
    private int id;
    private LocalDateTime time;
    private MovieInfo movieInfo;
    private HallInfo hallInfo;
}
