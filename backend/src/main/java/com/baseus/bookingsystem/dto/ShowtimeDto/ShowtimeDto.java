package com.baseus.bookingsystem.dto.ShowtimeDto;

import com.baseus.bookingsystem.entity.Showtime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ShowtimeDto {
    private int id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int hallId;
    private int movieId;


    public ShowtimeDto(Showtime showtime) {
        this.id = showtime.getId();
        this.startTime = showtime.getTime();
        this.endTime = showtime.getTime().plusMinutes(showtime.getMovie().getDuration());
        this.hallId = showtime.getHall().getId();
        this.movieId = showtime.getMovie().getId();
    }
}
