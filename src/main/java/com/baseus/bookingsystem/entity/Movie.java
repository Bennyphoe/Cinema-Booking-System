package com.baseus.bookingsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "movies")
@NoArgsConstructor
@Getter
@Setter
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name="start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "rating", nullable = false)
    private String rating;

    @Column(name = "image", nullable = true)
    private String image;

    @Column(name = "active", nullable = false)
    private Boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Showtime> showTimes;

    public Movie(String rating, int duration, LocalDateTime endDate, LocalDateTime startDate, String name) {
        this.rating = rating;
        this.duration = duration;
        this.endDate = endDate;
        this.startDate = startDate;
        this.name = name;
        this.active = true;
    }

    public Movie(String name, LocalDateTime startDate, LocalDateTime endDate, int duration, String rating, String image) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.duration = duration;
        this.rating = rating;
        this.image = image;
        this.active = true;
    }

    public void addShowtime(Showtime showtime) {
        if (showTimes == null) {
            showTimes = new ArrayList<>();
        }
        showTimes.add(showtime);
        showtime.setMovie(this);
    }

}
