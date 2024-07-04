package com.baseus.bookingsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "halls")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "hall", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Seat> seats;

    @Column(name = "row_count")
    private int rowCount;

    @Column(name = "col_count")
    private int colCount;

    @Column(name = "active", nullable = false)
    private boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "hall", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Showtime> showTimes;

    public Hall(String name, int rowCount, int colCount, boolean active) {
        this.name = name;
        this.rowCount = rowCount;
        this.colCount = colCount;
        this.active = active;
    }

    public void addSeat(Seat seat) {
        if (seats == null) {
            seats = new ArrayList<>();
        }
        seats.add(seat);
        seat.setHall(this);
    }

    public void addShowtime(Showtime showtime) {
        if (showTimes == null) {
            showTimes = new ArrayList<>();
        }
        showTimes.add(showtime);
        showtime.setHall(this);
    }
}
