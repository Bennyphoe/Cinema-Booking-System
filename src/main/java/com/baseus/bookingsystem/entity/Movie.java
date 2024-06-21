package com.baseus.bookingsystem.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "movie")
@NoArgsConstructor
@Getter
@Setter
@ToString
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

    public Movie(String rating, int duration, LocalDateTime endDate, LocalDateTime startDate, String name) {
        this.rating = rating;
        this.duration = duration;
        this.endDate = endDate;
        this.startDate = startDate;
        this.name = name;
    }

    public Movie(String name, LocalDateTime startDate, LocalDateTime endDate, int duration, String rating, String image) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.duration = duration;
        this.rating = rating;
        this.image = image;
    }
}
