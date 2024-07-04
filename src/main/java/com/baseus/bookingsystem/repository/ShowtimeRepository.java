package com.baseus.bookingsystem.repository;

import com.baseus.bookingsystem.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {

}
