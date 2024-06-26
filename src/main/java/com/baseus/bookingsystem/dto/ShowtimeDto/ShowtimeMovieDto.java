package com.baseus.bookingsystem.dto.ShowtimeDto;

import com.baseus.bookingsystem.dto.MovieDto.MovieInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ShowtimeMovieDto {
    private MovieInfo movie;
    private List<ShowtimeInfo> showtimes;
}
