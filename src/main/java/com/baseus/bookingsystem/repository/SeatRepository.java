package com.baseus.bookingsystem.repository;

import com.baseus.bookingsystem.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Integer> {
}
