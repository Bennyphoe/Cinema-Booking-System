package com.baseus.bookingsystem.dto.MovieDto;

import com.baseus.bookingsystem.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MovieInfo {
    private int id;
    private String name;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String rating;
    private String image;
    private int duration;

    public MovieInfo(Movie movie) {
        this.id = movie.getId();
        this.name = movie.getName();
        this.startDate = movie.getStartDate();
        this.endDate = movie.getEndDate();
        this.rating = movie.getRating();
        this.image = movie.getImage();
        this.duration = movie.getDuration();
    }
}
