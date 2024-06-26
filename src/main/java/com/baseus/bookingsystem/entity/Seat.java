package com.baseus.bookingsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seats")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "available", nullable = false)
    private boolean available;

    @Column(name = "row_idx", nullable = false)
    private int rowIdx;

    @Column(name = "col_idx", nullable = false)
    private int colIdx;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hall_id", nullable = false)
    private Hall hall;

    public Seat(boolean available, int rowIdx, int colIdx) {
        this.available = available;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
    }
}
